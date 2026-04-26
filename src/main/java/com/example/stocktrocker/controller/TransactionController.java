package com.example.stocktrocker.controller;

import com.example.stocktrocker.entities.Stock;
import com.example.stocktrocker.entities.User;
import com.example.stocktrocker.service.StockService;
import com.example.stocktrocker.service.TransactionService;
import com.example.stocktrocker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    @Autowired private TransactionService transactionService;
    @Autowired private UserService userService;
    @Autowired private StockService stockService;

    @PostMapping("/buy")
    public ResponseEntity<String> buy( @RequestParam String symbol, @RequestParam int amount) {
        String currentUserEmail = (String) org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();

        User user = userService.getUserByEmail(currentUserEmail);
        Stock stock = stockService.findBySymbol(symbol);
        transactionService.buyStock(user, stock, amount);
        return ResponseEntity.ok("Transaction completed: BUY " + amount + " " + symbol);
    }
    @PostMapping("/sell")
    public ResponseEntity<String> sell( @RequestParam String symbol, @RequestParam int amount) {
        String currentUserEmail = (String) org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        User user = userService.getUserByEmail(currentUserEmail);
        Stock stock = stockService.findBySymbol(symbol);
        transactionService.sellStock(user, stock, amount);
        return ResponseEntity.ok("Transaction completed: SELL " + amount + " " + symbol);
    }
}