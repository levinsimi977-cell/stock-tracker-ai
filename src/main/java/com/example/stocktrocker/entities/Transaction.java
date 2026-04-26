package com.example.stocktrocker.entities;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Table(name = "transactions")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Data
@ToString
@EqualsAndHashCode
public class Transaction {//הסטורית עסקה ספציפית
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "user_id")
        private User user;

        @ManyToOne
        @JoinColumn(name = "stock_id")
        private Stock stock;

        private TransactionType type;
        private Integer amount; // כמות המניות בעסקה

        private Double priceAtExecution; // המחיר בזמן הביצוע

        private LocalDateTime timestamp; // מתי זה קרה


}
