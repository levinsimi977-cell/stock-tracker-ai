package com.example.stocktrocker.service;

import com.example.stocktrocker.entities.Stock;
import com.example.stocktrocker.entities.StockOwnership;
import com.example.stocktrocker.entities.Transaction;
import com.example.stocktrocker.entities.User;
import com.example.stocktrocker.repositories.StockRepo;
import com.example.stocktrocker.repositories.UserRepo;
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
    @Autowired
    private UserRepo userRepo;
    private final Map<Long, String> aiAdviceCache = new ConcurrentHashMap<>();

    public StockService(StockRepo stockRepo) {
        this.stockRepo = stockRepo;
    }
    public String getExternalAIAdvice(Stock stock) {
        if (aiAdviceCache.containsKey(stock.getId())) {
            return aiAdviceCache.get(stock.getId());
        }
        String data = "חברה: " + stock.getCompanyName() +
                ", מחיר: " + stock.getCurrentPrice() +
                ", מגמה: " + calculatePriceTrend(stock) +
                ", דוח: " + stock.getFinancialReport();
        String advice = aiService.summarizeReports(data);
        aiAdviceCache.put(stock.getId(), advice);
        return advice;
    }

    /**
     * מדמה ניתוח AI מילולי על סמך נתונים טכניים ופיננסיים
     */
    public String getAIAnalysis(Stock stock) {
        try {
            // במקום לחשב רק את השינוי האחרון, נשתמש בשיפוע של כל 10 המחירים
            double slope = runLinearRegression(stock.getMovePrice());
            double immediateChange = calculatePriceTrend(stock); // השינוי המיידי מהפעולה האחרונה

            String recommendation;
            String reasoning;
            String trendIcon;

            // אם השיפוע שלילי - המגמה הכללית היא ירידה
            if (slope < -0.05) {
                recommendation = "מכירה (Sell)";
                trendIcon = "📉";
                reasoning = "האלגוריתם מזהה מגמת ירידה עקבית ב-10 הדגימות האחרונות. לא מומלץ להחזיק כרגע.";
            }
            // אם השיפוע חיובי - המגמה הכללית היא עלייה
            else if (slope > 0.05) {
                recommendation = "קנייה (Buy)";
                trendIcon = "📈";
                reasoning = "זוהה מומנטום חיובי ועלייה עקבית בערך המניה. פוטנציאל רווח גבוה.";
            }
            // אם השיפוע כמעט אפס - השוק באמת יציב
            else {
                recommendation = "החזקה (Hold)";
                trendIcon = "⚖️";
                reasoning = "המחיר תנודתי אך המגמה הכללית אופקית (יציבה). כדאי להמתין לפריצה.";
            }

            // מוסיף התייחסות ספציפית אם הייתה ירידה חדה הרגע (כמו שקרה לך עם ה-9000 מניות)
            if (immediateChange < -5) {
                reasoning += " שימי לב: הפעולה האחרונה גרמה לירידה חדה של " + String.format("%.2f%%", immediateChange) + ".";
            }

            return String.format("%s ניתוח %s: המלצת %s. %s",
                    trendIcon, stock.getSymbol(), recommendation, reasoning);

        } catch (Exception e) {
            return "שגיאה בניתוח הנתונים: " + e.getMessage();
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

    private void updateAllUsersHoldings(Stock stock) {

        if (stock.getOwnerships() == null) return;

        for (StockOwnership ownership : stock.getOwnerships()) {

            User user = ownership.getUser();

            double totalValue = 0.0;

            for (StockOwnership o : user.getHoldings()) {
                totalValue += o.getStock().getCurrentPrice() * o.getQuantity();
            }

            user.setValueStock(totalValue);

            userRepo.save(user);
        }
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
    public Stock updateStock(Long id, Stock updatedStock) {
        Stock existingStock = stockRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Stock not found"));

        // 1. עדכון פרטים בסיסיים
        if (updatedStock.getCompanyName() != null && !updatedStock.getCompanyName().isBlank()) {
            existingStock.setCompanyName(updatedStock.getCompanyName());
        }
        if (updatedStock.getSector() != null && !updatedStock.getSector().isBlank()) {
            existingStock.setSector(updatedStock.getSector());
        }
        if (updatedStock.getAvailableShares() >= 0) {
            existingStock.setAvailableShares(updatedStock.getAvailableShares());
        }

        // 2. טיפול במחיר - זה החלק הקריטי לגרף!
        if (updatedStock.getCurrentPrice() > 0) {
            // אנחנו מעדכנים את ההיסטוריה *לפני* השמירה הסופית
            updatePriceHistory(existingStock, updatedStock.getCurrentPrice());
        }

        // 3. שמירה אחת ויחידה ב-DB
        Stock saved = stockRepo.save(existingStock);

        // 4. עדכון ה-Cache כדי שה-AI והגרף יראו את השינוי מיד
        quickPriceMap.put(saved.getSymbol(), saved.getCurrentPrice());

        // 5. עדכון תיקי המשתמשים
        updateAllUsersHoldings(saved);

        return saved;
    }

    private void updatePriceHistory(Stock stock, double newPrice) {
        if (stock.getMovePrice() == null) {
            stock.setMovePrice(new ArrayList<>());
        }

        // הוספה למערך התנודות
        stock.getMovePrice().add(newPrice);

        // הגבלה ל-10 נתונים אחרונים
        if (stock.getMovePrice().size() > 10) {
            stock.getMovePrice().remove(0);
        }

        // עדכון המחיר הנוכחי באובייקט
        stock.setCurrentPrice(newPrice);

        // שימי לב: הסרתי מכאן את ה-save! הוא מתבצע בתוך updateStock
    }
    public Stock findBySymbol(String stockSymbol) {
        return stockRepo.findBySymbol(stockSymbol);
    }

    public List<Stock> findAllBySector(String sector) {
        return stockRepo.findAllBySector(sector);
    }


    public Double getStockPrice(String symbol) {

        return quickPriceMap.computeIfAbsent(symbol, s -> {
            Stock stock = stockRepo.findBySymbol(s);
            if (stock != null) {
                return stock.getCurrentPrice();
            }
            return 0.0;
        });
    }
    public void updatePriceInCache(String symbol, Double newPrice) {
        quickPriceMap.put(symbol, newPrice);
    }
}


