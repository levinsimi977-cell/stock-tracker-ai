package com.example.stocktrocker.repositories;

import com.example.stocktrocker.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserId(Long userId);
    List<Transaction> findByStockId(Long stockId);
    List<Transaction> findByTimestampBetween(LocalDateTime start, LocalDateTime end);

}