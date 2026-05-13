package com.example.stocktrocker.controller;

import com.example.stocktrocker.entities.StockOwnership;
import com.example.stocktrocker.entities.User;
import com.example.stocktrocker.repositories.StockOwnershipRepo;
import com.example.stocktrocker.repositories.UserRepo;
import com.example.stocktrocker.service.StockOwnershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.stocktrocker.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "http://localhost:3000")
public class StockOwnershipController {
    @Autowired private StockOwnershipService ownershipService;
    @Autowired private StockOwnershipRepo ownershipRepo;
    @Autowired private UserService userService;
    @Autowired private UserRepo userRepo;

    @GetMapping("/advice/{stockId}")
    public ResponseEntity<String> getAIAdvice(@PathVariable Long stockId) {
        // שליית המשתמש המחובר מה-Token
        String email = (String) org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        User user = userService.getUserByEmail(email);

        StockOwnership ownership = ownershipRepo.findByUserIdAndStockId(user.getId(), stockId);
        if (ownership == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(ownershipService.getGeniusAIAdvice(ownership));
    }
    // חישוב רווח/הפסד נוכחי על החזקה
    @GetMapping("/pnl/{userId}/{stockId}")
    public double getProfitAndLoss(@PathVariable Long userId, @PathVariable Long stockId) {
        StockOwnership ownership = ownershipRepo.findByUserIdAndStockId(userId, stockId);
        return ownershipService.calculateCurrentPAndL(ownership);
    }

    @GetMapping("/my-portfolio")
    public ResponseEntity<?> getMyPortfolio() {
        try {
            String email = (String) org.springframework.security.core.context.SecurityContextHolder
                    .getContext().getAuthentication().getPrincipal();
            User user = userService.getUserByEmail(email);

            if (user == null) {
                return ResponseEntity.status(401).body("User not found");
            }

            List<StockOwnership> portfolio = ownershipRepo.findByUserId(user.getId());
            return ResponseEntity.ok(portfolio);
        } catch (Exception e) {
            // הדפסת השגיאה לקונסול של ה-IntelliJ כדי שתראי מה באמת קרה
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}