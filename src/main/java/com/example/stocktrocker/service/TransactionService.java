package com.example.stocktrocker.service;

import com.example.stocktrocker.entities.*;
import com.example.stocktrocker.repositories.StockRepo;
import com.example.stocktrocker.repositories.TransactionRepo;
import com.example.stocktrocker.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service

public class TransactionService {

    @Autowired
    private StockService stockService;
    @Autowired
    private StockOwnershipService stockOwnershipService;
    @Autowired
    private TransactionRepo transactionRepo;
    @Autowired
    private StockRepo stockRepo;
    @Autowired
    private UserRepo userRepo;

    // מבצע רכישת מניות כולל בדיקות ועדכון יתרות
    public void buyStock(User user, Stock stock, int amount) {
        if (amount <= 0) throw new RuntimeException("כמות לא תקינה");
        if (stock.getAvailableShares() < amount) {
            throw new RuntimeException("אין מספיק מניות פנויות בחברה לרכישה זו");
        }

        double totalCost = stock.getCurrentPrice() * amount;
        if (user.getBalance() < totalCost) {
            throw new RuntimeException("אין לך מספיק כסף בקופה");
        }

        user.setBalance(user.getBalance() - totalCost);
        userRepo.save(user);

        Transaction t = new Transaction();
        t.setUser(user);
        t.setStock(stock);
        t.setAmount(amount);
        t.setType(TransactionType.BUY);
        t.setPriceAtExecution(stock.getCurrentPrice());
        t.setTimestamp(LocalDateTime.now());
        transactionRepo.save(t);

        stock.setAvailableShares(stock.getAvailableShares() - amount);
        double priceImpact = 1 + (amount * 0.0001);
        double updatedPrice = stock.getCurrentPrice() * priceImpact;
        stock.setCurrentPrice(updatedPrice);

        stockRepo.save(stock);
        stockService.updatePriceInCache(stock.getSymbol(), updatedPrice);

        stockOwnershipService.addStockOwnership(user, stock, amount);
    }

    public void sellStock(User user, Stock stock, int amount) {

        if (amount <= 0) throw new RuntimeException("כמות לא תקינה");
        Transaction t = new Transaction();
        t.setUser(user);
        t.setStock(stock);
        t.setAmount(amount);
        t.setType(TransactionType.SELL);
        t.setPriceAtExecution(stock.getCurrentPrice());
        t.setTimestamp(LocalDateTime.now());
        transactionRepo.save(t);

        stock.setAvailableShares(stock.getAvailableShares() + amount);
        stockRepo.save(stock);

        stockOwnershipService.sellStockOwnership(t, amount);

        double totalRevenue = stock.getCurrentPrice() * amount;
        user.setBalance(user.getBalance() + totalRevenue);
        userRepo.save(user);
    }

    public List<Transaction> getTransactionsByUser(Long userId) {
        return transactionRepo.findByUserId(userId);
    }

    public List<Transaction> getTransactionsByStock(Long stockId) {
        return transactionRepo.findByStockId(stockId);
    }


}
