package com.example.stocktrocker.controller;

import com.example.stocktrocker.entities.StockOwnership;
import com.example.stocktrocker.repositories.StockOwnershipRepo;
import com.example.stocktrocker.service.StockOwnershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "http://localhost:3000")
public class StockOwnershipController {
    @Autowired private StockOwnershipService ownershipService;
    @Autowired private StockOwnershipRepo ownershipRepo;
    @GetMapping("/advice/{userId}/{stockId}")
    public ResponseEntity<String> getAIAdvice(@PathVariable Long userId, @PathVariable Long stockId) {
        StockOwnership ownership = ownershipRepo.findByUserIdAndStockId(userId, stockId);
        if (ownership == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(ownershipService.getGeniusAIAdvice(ownership));
    }
    // חישוב רווח/הפסד נוכחי על החזקה
    @GetMapping("/pnl/{userId}/{stockId}")
    public double getProfitAndLoss(@PathVariable Long userId, @PathVariable Long stockId) {
        StockOwnership ownership = ownershipRepo.findByUserIdAndStockId(userId, stockId);
        return ownershipService.calculateCurrentPAndL(ownership);
    }
}