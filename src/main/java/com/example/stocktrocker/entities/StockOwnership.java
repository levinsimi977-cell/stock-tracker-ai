package com.example.stocktrocker.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Table(name = "stock_ownerships")
@Getter @Setter


@Entity

public class StockOwnership {//החזקה במניות באותה חברה

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "user_id")
        @JsonIgnore

        private User user;
        @ManyToOne
        @JoinColumn(name = "stock_id")
        private Stock stock;
        private int quantity = 0;//כמה הוא מחזיק מהמניה הזו כרגע
        private double purchasePrice = 0;//מחיר ממוצע


}
