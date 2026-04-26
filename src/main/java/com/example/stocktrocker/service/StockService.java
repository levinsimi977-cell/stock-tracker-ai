package com.example.stocktrocker.service;

import com.example.stocktrocker.entities.Stock;
import com.example.stocktrocker.entities.Transaction;
import com.example.stocktrocker.repositories.StockRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class StockService {
    private final Map<String, Double> quickPriceMap = new ConcurrentHashMap<>();
    @Autowired
    private StockRepo stockRepo;
    @Autowired
    private AIService aiService;


    public StockService(StockRepo stockRepo) {
        this.stockRepo = stockRepo;
    }
    public String getExternalAIAdvice(Stock stock) {
        String data = "חברה: " + stock.getCompanyName() +
                ", מחיר: " + stock.getCurrentPrice() +
                ", מגמה: " + calculatePriceTrend(stock) +
                ", דוח: " + stock.getFinancialReport();

        return aiService.summarizeReports(data);
    }

    /**
     * מדמה ניתוח AI מילולי על סמך נתונים טכניים ופיננסיים
     */
    public String getAIAnalysis(Stock stock) {
        try {
            double changePercent = calculatePriceTrend(stock);

            String priceTrend = "יציב";
            if (changePercent > 1) priceTrend = "עלייה";
            else if (changePercent < -1) priceTrend = "ירידה";

            String financialStatus = stock.getFinancialReport().toLowerCase();
            boolean isProfitable = financialStatus.contains("profit") || financialStatus.contains("צמיחה");

            String recommendation;
            String reasoning;

            if (priceTrend.equals("עלייה") && isProfitable) {
                recommendation = "קנייה (Buy)";
                reasoning = "המניה מציגה מומנטום חיובי של " + String.format("%.2f%%", changePercent) + " בשילוב דוחות חזקים.";
            } else if (priceTrend.equals("ירידה") || !isProfitable) {
                recommendation = "מכירה (Sell)";
                reasoning = "זוהתה מגמת החלשות או חוסר יציבות בנתונים הפיננסיים.";
            } else {
                recommendation = "החזקה (Hold)";
                reasoning = "השינוי במחיר מינורי (" + String.format("%.2f%%", changePercent) + "); מומלץ להמתין.";
            }

            return String.format("ניתוח עבור %s (%s): המלצת %s. %s",
                    stock.getCompanyName(), stock.getSymbol(), recommendation, reasoning);

        } catch (Exception e) {
            return "שגיאה בביצוע ניתוח: " + e.getMessage();
        }
    }

    public void addPrice(Stock stock, double newPrice) {
        List<Double> prices = stock.getMovePrice();

        if (prices.size() >= 10) {
            prices.remove(0);
        }

        prices.add(newPrice);
    }

    public List<Stock> getTopStocks() {
        return stockRepo.findAll().stream()
                .sorted((a, b) -> Double.compare(score(b), score(a)))
                .limit(5)
                .toList();
    }

    private double score(Stock s) {
        double trend = calculatePriceTrend(s);
        double avg = s.getMovePrice().stream().mapToDouble(Double::doubleValue).average().orElse(0);
        return trend + (s.getCurrentPrice() - avg);
    }

    public List<Stock> getMomentumStocks() {
        return stockRepo.findAll().stream()
                .filter(s -> s.getMovePrice() != null && s.getMovePrice().size() >= 5)
                .filter(s -> {
                    double avg = s.getMovePrice().stream().mapToDouble(Double::doubleValue).average().orElse(0);
                    return s.getCurrentPrice() > avg * 1.15;
                })
                .collect(Collectors.toList());
    }

    public double predictFutureValue(long stockId) {
        Stock s = stockRepo.findById(stockId).orElse(null);
        if (s == null || s.getMovePrice() == null || s.getMovePrice().size() < 5) return 0;

        double predictedPrice = runLinearRegression(s.getMovePrice());
        return predictedPrice * s.getTotalShares();
    }
    private double calculatePriceTrend(Stock s) {
        if (s.getMovePrice() == null || s.getMovePrice().isEmpty()) return 0;
        double current = s.getCurrentPrice();
        double last = s.getMovePrice().get(s.getMovePrice().size() - 1);
        return ((current - last) / last) * 100;
    }

    private double runLinearRegression(List<Double> prices) {
        int n = prices.size();
        double sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        for (int i = 0; i < n; i++) {
            sumX += i;
            sumY += prices.get(i);
            sumXY += i * prices.get(i);
            sumX2 += i * i;
        }
        double slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        double intercept = (sumY - slope * sumX) / n;
        return slope * n + intercept;
    }


    public void addAStock(Stock stock) {
        stockRepo.save(stock);
    }

    public void addAmountStock(int amount, long idStack) {
        stockRepo.findById(idStack).ifPresent(s -> {
            double priceBefore = s.getCurrentPrice();
            s.setAvailableShares(s.getAvailableShares() + amount);
            s.setTotalShares(s.getTotalShares() + amount);

            double newPrice = s.getValueCompany() / s.getTotalShares();
            updateUserValues(s, priceBefore, newPrice);
            updatePriceHistory(s, newPrice);
            stockRepo.save(s);
        });
    }

    public void addToValueStock(double value, long idStack) {
        stockRepo.findById(idStack).ifPresent(s -> {
            double priceBefore = s.getCurrentPrice();
            s.setValueCompany(s.getValueCompany() + value);
            double newPrice = s.getValueCompany() / s.getTotalShares();

            updateUserValues(s, priceBefore, newPrice);
            updatePriceHistory(s, newPrice);
            stockRepo.save(s);
        });
    }

    private void updateUserValues(Stock s, double priceBefore, double newPrice) {
        if (s.getUserTransaction() != null) {
            for (Transaction us : s.getUserTransaction()) {
                double valueDiff = (newPrice - priceBefore) * us.getAmount();
                us.getUser().setValueStock(us.getUser().getValueStock() + valueDiff);
            }
        }
    }

    public List<Stock> getAllStocks() {
        return stockRepo.findAll();
    }

    public Stock getStockById(long id) {
        return stockRepo.findById(id).orElse(null);
    }

    public void deleteStock(long id) {
        stockRepo.findById(id).ifPresent(stock -> {
            if (stock.getUserTransaction() != null) {
                for (Transaction tu : stock.getUserTransaction()) {
                    tu.getUser().setBalance(tu.getUser().getBalance() + stock.getCurrentPrice() * tu.getAmount());
                    tu.getUser().setValueStock(tu.getUser().getValueStock() - (stock.getCurrentPrice() * tu.getAmount()));
                }
            }
            stockRepo.delete(stock);
        });
    }

    public Stock findBySymbol(String stockSymbol) {
        return stockRepo.findBySymbol(stockSymbol);
    }

    public List<Stock> findAllBySector(String sector) {
        return stockRepo.findAllBySector(sector);
    }

    private void updatePriceHistory(Stock stock, double newPrice) {


        if (stock.getMovePrice() == null) {
            stock.setMovePrice(new ArrayList<>());
        }
        stock.getMovePrice().add(stock.getCurrentPrice());
        if (stock.getMovePrice().size() > 10) {
            stock.getMovePrice().remove(0);
        }
        stock.setCurrentPrice(newPrice);
        quickPriceMap.put(stock.getSymbol(), newPrice);

    }
    public Double getStockPrice(String symbol) {
        // בודק אם המחיר כבר קיים במפה.
        // אם לא, הוא מפעיל את הלוגיקה שבתוך ה-lambda (החץ) כדי להביא מה-DB
        return quickPriceMap.computeIfAbsent(symbol, s -> {
            Stock stock = stockRepo.findBySymbol(s);
            if (stock != null) {
                return stock.getCurrentPrice();
            }
            return 0.0; // ערך ברירת מחדל אם המניה לא נמצאה
        });
    }
    public void updatePriceInCache(String symbol, Double newPrice) {
        // עדכון המפה המהירה בזיכרון
        quickPriceMap.put(symbol, newPrice);
    }
}


