package com.example.stocktrocker.repositories;

import com.example.stocktrocker.entities.Stock;
import com.example.stocktrocker.entities.StockOwnership;
import com.example.stocktrocker.entities.Transaction;
import com.example.stocktrocker.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockOwnershipRepo extends JpaRepository<StockOwnership, Long> {
        StockOwnership findByUserIdAndStockId(Long userId, Long stockId);
        // תיקון למציאת בעלות לפי טרנזקציה (נדרש ב-Service שלך)
        default StockOwnership findByTransaction(Transaction t) {
            return findByUserIdAndStockId(t.getUser().getId(), t.getStock().getId());
        }

}
