package com.example.stocktrocker.controller;

import com.example.stocktrocker.entities.Stock;
import com.example.stocktrocker.service.StockService;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.HtmlUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "http://localhost:3000")
public class StockController {
    @Autowired
    private StockService stockService;
    // --- Admin Actions ---
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<String> addStock(@RequestBody Stock stock) {
        try {
            stock.setSymbol(HtmlUtils.htmlEscape(stock.getSymbol()));
            stock.setCompanyName(HtmlUtils.htmlEscape(stock.getCompanyName()));
            stock.setSector(HtmlUtils.htmlEscape(stock.getSector()));
            stockService.addAStock(stock);
            return ResponseEntity.ok("המניה נוספה");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("שגיאה בהוספת המניה: " + e.getMessage());
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateStock(
            @PathVariable Long id,
            @RequestBody Stock updatedStock) {

        try {

            System.out.println("========== UPDATE ==========");
            System.out.println(updatedStock);

            Stock updated = stockService.updateStock(id, updatedStock);

            return ResponseEntity.ok(updated);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.internalServerError()
                    .body(Map.of(
                            "message", e.getMessage(),
                            "exception", e.getClass().getSimpleName()
                    ));
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addAmountStock") // נתיב פשוט בלי לוכסנים בסוף
    public ResponseEntity<String> addAmountStock(@RequestBody Map<String, Object> payload) {
        try {
            // שליפת הנתונים מתוך ה-Body ששלחנו מה-React
            Long id = Long.valueOf(payload.get("id").toString());
            int amount = Integer.parseInt(payload.get("amount").toString());

            stockService.addAmountStock(amount, id);
            return ResponseEntity.ok("כמות המניה עודכנה בהצלחה!");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("שגיאה בנתונים: " + e.getMessage());
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStock(@PathVariable Long id) {
        try {
            stockService.deleteStock(id);
            return ResponseEntity.ok("המניה נמחקה בהצלחה!");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("שגיאה במחיקה");
        }
    }


    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping
    public List<Stock> getAllStocks() {
        try {

            return stockService.getAllStocks();
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/{symbol}")
    public ResponseEntity<Stock> getStockBySymbol(@PathVariable String symbol) {
        Stock stock = stockService.findBySymbol(symbol);
        return stock != null ? ResponseEntity.ok(stock) : ResponseEntity.notFound().build();
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/ai/sector-health/{sector}")
    public ResponseEntity<String> getSectorAnalysis(@PathVariable String sector) { // תוקן מ-Stock ל-String
        List<Stock> stocks = stockService.findAllBySector(sector);
        if (stocks.isEmpty()) return ResponseEntity.ok("לא נמצאו מניות בסקטור זה.");

        String summary = stocks.stream()
                .map(s -> stockService.getAIAnalysis(s))
                .collect(Collectors.joining("\n\n"));

        return ResponseEntity.ok("--- ניתוח סקטור: " + sector + " ---\n" + summary);
    }
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/ai/analysis/{id}")
    public ResponseEntity<?> getFullAnalysis(@PathVariable Long id) {
        Stock stock = stockService.getStockById(id);
        if (stock == null) return ResponseEntity.notFound().build();

        Map<String, Object> response = new HashMap<>();
        response.put("symbol", stock.getSymbol());
        response.put("aiInsight", stockService.getAIAnalysis(stock));
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/ai/momentum")
    public ResponseEntity<List<Stock>> getHotStocks() {
        return ResponseEntity.ok(stockService.getMomentumStocks());
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/ai/predict/{id}")
    public ResponseEntity<Double> predictFuture(@PathVariable Long id) {
        double prediction = stockService.predictFutureValue(id);
        return ResponseEntity.ok(prediction);
    }
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/ai/expert-advice/{id}")
    public ResponseEntity<String> getExpertAdvice(@PathVariable Long id) {
        Stock stock = stockService.getStockById(id);
        if (stock == null) return ResponseEntity.notFound().build();

        // קריאה לפונקציה שמשתמשת ב-AIService
        String advice = stockService.getExternalAIAdvice(stock);
        return ResponseEntity.ok(advice);
    }
}