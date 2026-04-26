package com.example.stocktrocker.repositories;

import com.example.stocktrocker.entities.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface StockRepo extends JpaRepository<Stock, Long> {


    Stock findBySymbol(String symbol);
        List<Stock> findAllBySector(String sector);
    }