package com.example.stocktrocker.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;


@Getter
@Setter

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@EqualsAndHashCode

@Table(name = "users")  // שינוי שם הטבלה מ-user ל-users

public class User {
    public enum Role {
        USER,
        ADMIN
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
private Role role;
    private String email;

    private Double balance; // יתרה כספית לקנייה
private double valueStock;//ערך כלל המניות שברשותו
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<StockOwnership> holdings; // רשימת המניות שבבעלותו


}
