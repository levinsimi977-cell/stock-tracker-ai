package com.example.stocktrocker.repositories;

import com.example.stocktrocker.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepo extends JpaRepository<User,Long> {
    boolean existsByEmail(String email);
    User findByEmail(String email);
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.balance = u.balance + :amount WHERE u.id = :userId")
    void updateBalance(@Param("userId") Long userId, @Param("amount") Double amount);

}


