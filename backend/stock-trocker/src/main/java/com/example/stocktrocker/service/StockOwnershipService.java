package com.example.stocktrocker.service;

import com.example.stocktrocker.entities.*;
import com.example.stocktrocker.repositories.StockOwnershipRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
public class StockOwnershipService {
    @Autowired
    private MLService mlService;
    @Autowired
    private StockOwnershipRepo stockOwnershipRepo;
    @Transactional
    // מוסיף מניות לתיק המשתמש או מעדכן ממוצע מחיר
    public void addStockOwnership(User user, Stock stock, int amount) {
        StockOwnership ownership = stockOwnershipRepo.findByUserIdAndStockId(user.getId(), stock.getId());
        if (ownership == null) {
            // יצירת בעלות חדשה
            ownership = new StockOwnership();
            ownership.setUser(user);
            ownership.setStock(stock);
            ownership.setQuantity(amount);
            ownership.setPurchasePrice(stock.getCurrentPrice());
        } else {
            double totalCost = (ownership.getQuantity() * ownership.getPurchasePrice()) + (amount * stock.getCurrentPrice());
            ownership.setQuantity(ownership.getQuantity() + amount);
            ownership.setPurchasePrice(totalCost / ownership.getQuantity());
        }
        stockOwnershipRepo.save(ownership);
    }
    // מחשב רווח/הפסד נוכחי לפי מחיר שוק

    public double calculateCurrentPAndL(StockOwnership ownership) {
        if (ownership == null || ownership.getStock() == null) return 0.0;
        double currentMarketPrice = ownership.getStock().getCurrentPrice();
        return (currentMarketPrice - ownership.getPurchasePrice()) * ownership.getQuantity();
    }
    // המלצה בסיסית לפי ממוצע ומקסימום
    public String getAIRecommendation(StockOwnership ownership) {

        List<Double> history = ownership.getStock().getMovePrice();
        if (history == null || history.size() < 2) return "ממתין לנתוני שוק...";

        double currentPrice = ownership.getStock().getCurrentPrice();
        double avg = history.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
        double max = Collections.max(history);

        if (currentPrice >= max) return "המחיר בשיא! AI ממליץ לממש רווחים (SELL).";
        if (currentPrice < avg * 0.9) return "המחיר נמוך מהממוצע. AI מזהה הזדמנות (BUY).";
        return "מגמה יציבה (HOLD).";
    }
// תחזית חכמה לפי רגרסיה ליניארית + דיוק מודל

    public String getGeniusAIAdvice(StockOwnership ownership) {

        List<Double> history = ownership.getStock().getMovePrice();
        if (history == null || history.size() < 2)
            return "אין מספיק נתונים לניתוח";
        List<Double> train = mlService.getTrainData(history);

        double predictedPrice = predictNextPrice(train);
        double currentPrice = ownership.getStock().getCurrentPrice();
        double changePercent = ((predictedPrice - currentPrice) / currentPrice) * 100;

        double accuracy = mlService.calculateAccuracy(history);

        return String.format(
                "תחזית: %.2f%% שינוי | דיוק המודל: %.2f%%",
                changePercent,
                accuracy * 100
        );
    }

    // חיזוי מחיר עתידי לפי מגמה ליניארית
    private double predictNextPrice(List<Double> prices) {
        int n = prices.size();
        double sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        for (int i = 0; i < n; i++) {
            sumX += i;
            sumY += prices.get(i);
            sumXY += i * prices.get(i);
            sumX2 += i * i;
        }
        double denominator = (n * sumX2 - sumX * sumX);
        if (denominator == 0) return prices.get(n - 1);
        double m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        double b = (sumY - m * sumX) / n;
        return m * n + b; // חיזוי הערך הבא (n)
    }

// מכירת מניות ועדכון התיק

        public void sellStockOwnership(Transaction t, int amount) {
            // 1. בדיקה: האם למשתמש יש מספיק מניות בתיק האישי?
            StockOwnership ownership =
                    stockOwnershipRepo.findByUserIdAndStockId(
                            t.getUser().getId(),
                            t.getStock().getId()
                    );
            if (ownership == null || ownership.getQuantity() < amount) {
                throw new RuntimeException("אין לך מספיק מניות מסוג זה כדי לבצע מכירה.");
            }
            ownership.setQuantity(ownership.getQuantity() - amount);

            if (ownership.getQuantity() == 0) {
                stockOwnershipRepo.delete(ownership);
            } else {
                stockOwnershipRepo.save(ownership);
            }

        }


}