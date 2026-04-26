package com.example.stocktrocker.entities;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


@Data
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "stocks")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String symbol; // למשל: AAPL

    private String companyName;

    private String sector; // למשל: "רכבים", "טכנולוגיה"
    private double valueCompany;//כמה המניה שווה באופן כללי
    private Double currentPrice;

    private int totalShares; // כמות מקסימלית שהחברה הקצתה
    private int availableShares; // כמה נשארו למכירה באתר
    @Column(columnDefinition = "TEXT")
    private String financialReport; // דוחות כספיים (מאזן וכדומה)
    //מערך להצגת גרף של תנודות המינה)10(
    @ElementCollection
    @CollectionTable(name = "movePrice", joinColumns = @JoinColumn(name = "stock_id"))
    @Column(name = "price")
    private List<Double> movePrice = new ArrayList<>();
    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL)
    private List<Transaction> userTransaction; // רשימת המניות שבבעלותו
}


