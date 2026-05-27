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
import java.util.HashMap;
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


        try {

            List<Double> history = stock.getMovePrice();

            double avg =
                    history.stream()
                            .mapToDouble(Double::doubleValue)
                            .average()
                            .orElse(0);

            double max =
                    history.stream()
                            .mapToDouble(Double::doubleValue)
                            .max()
                            .orElse(0);

            double min =
                    history.stream()
                            .mapToDouble(Double::doubleValue)
                            .min()
                            .orElse(0);

            double prediction =
                    runLinearRegression(history);

            double trend =
                    calculatePriceTrend(stock);

            String prompt = """
                אתה אנליסט מקצועי בשוק ההון.

                בצע ניתוח מלא למניה הבאה
                והחזר תשובה מקצועית בעברית.
  חשוב מאוד:
    החזר את כל התשובה בעברית בלבד.
    אסור להשתמש באנגלית, סינית או כל שפה אחרת.
    כל הכותרות, ההסברים וההמלצות חייבים להיות בעברית בלבד.
                ========================

                חברה: %s
                סימול: %s
                סקטור: %s

                מחיר נוכחי: %.2f

                היסטוריית מחירים:
                %s

                ממוצע מחירים: %.2f

                מחיר מקסימלי: %.2f

                מחיר מינימלי: %.2f

                שינוי אחרון באחוזים: %.2f%%

                תחזית אלגוריתמית עתידית: %.2f

                שווי חברה: %.2f

                כמות מניות כוללת: %d

                מניות זמינות למסחר: %d

                דוח פיננסי:
                %s

                ========================

                תן:

                1. מגמת שוק
                2. רמת סיכון
                3. זיהוי מומנטום
                4. האם קיימת תנודתיות חריגה
                5. המלצה אחת בלבד! קנייה / מכירה / החזקה
                6. הסבר מקצועי קצר
                7. רמת ביטחון באחוזים
                """.formatted(

                    stock.getCompanyName(),
                    stock.getSymbol(),
                    stock.getSector(),

                    stock.getCurrentPrice(),

                    history,

                    avg,

                    max,

                    min,

                    trend,

                    prediction,

                    stock.getValueCompany(),

                    stock.getTotalShares(),

                    stock.getAvailableShares(),

                    stock.getFinancialReport()
            );

            String advice =
                    aiService.summarizeReports(prompt);

            if (advice == null ||
                    advice.contains("AI_ANALYSIS_TEMPORARILY_UNAVAILABLE")) {

                return "הניתוח החכם לא זמין כרגע.";
            }


            return advice;

        } catch (Exception e) {

            e.printStackTrace();

            return "שגיאה בניתוח AI: " + e.getMessage();
        }
    }
    /**
     * מדמה ניתוח AI מילולי על סמך נתונים טכניים ופיננסיים
     */
    public Map<String, Object> getAIAnalysis(Stock stock) {
        try {

            double slope = calculateSlope(stock.getMovePrice());
            double immediateChange = calculatePriceTrend(stock);

            String trend;
            String risk;
            String momentum;
            String action;
            int confidence;

            // מגמה
            if (slope > 0.05) trend = "UP";
            else if (slope < -0.05) trend = "DOWN";
            else trend = "SIDE";

            // סיכון
            if (Math.abs(immediateChange) > 5) risk = "HIGH";
            else if (Math.abs(immediateChange) > 2) risk = "MEDIUM";
            else risk = "LOW";

            // מומנטום
            momentum = (immediateChange >= 0) ? "POSITIVE" : "NEGATIVE";

            // החלטה
            if (slope > 0.05 && risk != "HIGH") action = "BUY";
            else if (slope < -0.05) action = "SELL";
            else action = "HOLD";

            // ביטחון
            confidence = (int)(60 + (slope * 100));

            Map<String, Object> result = new HashMap<>();
            result.put("trend", trend);
            result.put("risk", risk);
            result.put("momentum", momentum);
            result.put("action", action);
            result.put("confidence", Math.min(95, Math.max(40, confidence)));

            return result;

        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return error;
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
        if (s == null || s.getMovePrice() == null || s.getMovePrice().isEmpty()) {
            return 0;
        }
        double predictedPrice = runLinearRegression(s.getMovePrice());

        // הגנה: מחיר מניה לא יכול להיות שלילי.
        // אם התחזית יצאה שלילית, נחזיר 0.01 (מחיר מינימלי)
        return Math.max(0.01, predictedPrice);
    }

    private double calculatePriceTrend(Stock s) {

        if (s.getMovePrice() == null ||
                s.getMovePrice().isEmpty()) {
            return 0;
        }

        double current = s.getCurrentPrice();

        if (s.getMovePrice().size() < 2) {
            return 0;
        }

        double last =
                s.getMovePrice()
                        .get(s.getMovePrice().size() - 2);
        if (last <= 0) {
            return 0;
        }

        return ((current - last) / last) * 100;
    }

    private double runLinearRegression(List<Double> prices) {

        if (prices == null || prices.isEmpty()) {
            return 0;
        }

        // אם יש רק מחיר אחד
        if (prices.size() == 1) {
            return prices.get(0);
        }

        List<Double> recentPrices =
                prices.stream()
                        .skip(Math.max(0, prices.size() - 50))
                        .toList();

        List<Double> smoothedPrices =
                calculateEMA(recentPrices, 0.3);

        int n = smoothedPrices.size();

        if (n < 2) {
            return smoothedPrices.get(n - 1);
        }

        double sumW = 0;
        double sumWX = 0;
        double sumWY = 0;
        double sumWXX = 0;
        double sumWXY = 0;

        for (int i = 0; i < n; i++) {

            double weight = Math.exp(i * 0.15);

            double x = i;
            double y = smoothedPrices.get(i);

            sumW += weight;
            sumWX += weight * x;
            sumWY += weight * y;
            sumWXX += weight * x * x;
            sumWXY += weight * x * y;
        }

        double denominator =
                (sumW * sumWXX - sumWX * sumWX);

        if (Math.abs(denominator) < 0.00001) {
            return smoothedPrices.get(n - 1);
        }

        double slope =
                (sumW * sumWXY - sumWX * sumWY)
                        / denominator;

        double intercept =
                (sumWY - slope * sumWX)
                        / sumW;

        // ======== כאן התיקון =========
        int futureDays = 30;

        double prediction =
                slope * (n + futureDays) + intercept;
        // ============================

        double currentPrice =
                smoothedPrices.get(n - 1);

        double maxAllowed =
                currentPrice * 1.4;

        double minAllowed =
                currentPrice * 0.6;

        prediction =
                Math.max(minAllowed, prediction);

        prediction =
                Math.min(maxAllowed, prediction);

        return Math.max(0.01, prediction);
    }
    private double calculateSlope(List<Double> prices) {

        if (prices == null || prices.size() < 2) {
            return 0;
        }

        int n = prices.size();

        double sumX = 0;
        double sumY = 0;
        double sumXY = 0;
        double sumXX = 0;

        for (int i = 0; i < n; i++) {

            double x = i;
            double y = prices.get(i);

            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumXX += x * x;
        }

        double denominator =
                (n * sumXX - sumX * sumX);

        if (denominator == 0) {
            return 0;
        }

        return (n * sumXY - sumX * sumY)
                / denominator;
    }
    private List<Double> calculateEMA(List<Double> prices, double alpha) {

        List<Double> ema = new ArrayList<>();

        if (prices == null || prices.isEmpty()) {
            return ema;
        }

        double previous = prices.get(0);

        ema.add(previous);

        for (int i = 1; i < prices.size(); i++) {

            // מדלגים על ערכים לא חוקיים
            if (prices.get(i) <= 0) {
                continue;
            }

            double current =
                    alpha * prices.get(i)
                            + (1 - alpha) * previous;

            ema.add(current);

            previous = current;
        }

        return ema;
    }
    public void addAStock(Stock stock) {

        if (stock.getTotalShares() <= 0) {
            stock.setTotalShares(stock.getAvailableShares());
        }

        if (stock.getAvailableShares() <= 0) {
            stock.setAvailableShares(stock.getTotalShares());
        }

        if (stock.getCurrentPrice() == null || stock.getCurrentPrice() <= 0) {
            stock.setCurrentPrice(1.0);
        }

        if (stock.getMovePrice() == null) {
            stock.setMovePrice(new ArrayList<>());
        }

        stock.getMovePrice().add(stock.getCurrentPrice());

        stockRepo.save(stock);
    }
    public void addAmountStock(int amount, long idStack) {

        stockRepo.findById(idStack).ifPresent(s -> {

            if (amount <= 0) {
                throw new RuntimeException("Amount invalid");
            }

            s.setAvailableShares(
                    s.getAvailableShares() + amount
            );

            s.setTotalShares(
                    s.getTotalShares() + amount
            );

            // דילול קטן של המחיר
            double dilutionFactor = 0.995;

            double newPrice =
                    s.getCurrentPrice() * dilutionFactor;

            newPrice = Math.max(0.01, newPrice);

            updatePriceHistory(s, newPrice);

            stockRepo.save(s);

            updatePriceInCache(
                    s.getSymbol(),
                    newPrice
            );

            updateAllUsersHoldings(s);
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
        if (updatedStock.getTotalShares() > 0) {
            existingStock.setTotalShares(updatedStock.getTotalShares());
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

//        // הגבלה ל-10 נתונים אחרונים
//        if (stock.getMovePrice().size() > 10) {
//            stock.getMovePrice().remove(0);
//        }

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


