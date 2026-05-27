package com.example.stocktrocker.service;

import com.example.stocktrocker.entities.*;
import com.example.stocktrocker.repositories.StockRepo;
import com.example.stocktrocker.repositories.TransactionRepo;
import com.example.stocktrocker.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

        if (amount <= 0) {
            throw new RuntimeException("כמות לא תקינה");
        }

        if (stock.getAvailableShares() < amount) {
            throw new RuntimeException("אין מספיק מניות פנויות בחברה לרכישה זו");
        }

        double executionPrice =
                stock.getCurrentPrice();

        double totalCost =
                executionPrice * amount;
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
        t.setPriceAtExecution(executionPrice);
        t.setTimestamp(LocalDateTime.now());
        transactionRepo.save(t);

        stock.setAvailableShares(stock.getAvailableShares() - amount);
        if (stock.getTotalShares() <= 0) {
            throw new RuntimeException("Total shares invalid");
        }
        double demandRatio =
                (double) amount / stock.getTotalShares();

// מגבלת השפעה כדי למנוע פיצוצים
        demandRatio = Math.min(demandRatio, 0.25);

// עוצמת השוק
        double marketStrength = 0.03;

        double priceImpact =
                1 + (demandRatio * marketStrength);
        double updatedPrice = stock.getCurrentPrice() * priceImpact;
        stock.setCurrentPrice(updatedPrice);

        stock.setValueCompany(
                updatedPrice * stock.getTotalShares()
        );
        stockService.addPrice(stock, updatedPrice);
        stockRepo.save(stock);
        stockService.updatePriceInCache(stock.getSymbol(), updatedPrice);

        stockOwnershipService.addStockOwnership(user, stock, amount);
    }
    public List<Transaction> getTodayTransactions() {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(23, 59, 59);

        return transactionRepo.findByTimestampBetween(startOfDay, endOfDay);
    }
    public void sellStock(User user, Stock stock, int amount) {


        if (amount <= 0) {
            throw new RuntimeException("כמות לא תקינה");
        }

        double executionPrice =
                stock.getCurrentPrice();

        Transaction t = new Transaction();
        t.setUser(user);
        t.setStock(stock);
        t.setAmount(amount);
        t.setType(TransactionType.SELL);

        t.setPriceAtExecution(executionPrice);

        t.setTimestamp(LocalDateTime.now());
        transactionRepo.save(t);

        stock.setAvailableShares(stock.getAvailableShares() + amount);
        if (stock.getTotalShares() <= 0) {
            throw new RuntimeException("Total shares invalid");
        }
        double supplyRatio =
                (double) amount / stock.getTotalShares();

        supplyRatio = Math.min(supplyRatio, 0.25);

        double marketStrength = 0.03;

        double priceImpact =
                1 - (supplyRatio * marketStrength);

        double updatedPrice =
                stock.getCurrentPrice() * priceImpact;

// הגנה
        updatedPrice = Math.max(0.01, updatedPrice);

        stock.setCurrentPrice(updatedPrice);

// עדכון שווי חברה
        stock.setValueCompany(
                updatedPrice * stock.getTotalShares()
        );

// היסטוריית מחירים
        stockService.addPrice(stock, updatedPrice);

// עדכון cache
        stockService.updatePriceInCache(
                stock.getSymbol(),
                updatedPrice
        );
        stockRepo.save(stock);

        stockOwnershipService.sellStockOwnership(t, amount);

        double totalRevenue =
                executionPrice * amount;
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
