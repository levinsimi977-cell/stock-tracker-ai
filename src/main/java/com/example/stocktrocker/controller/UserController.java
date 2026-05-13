package com.example.stocktrocker.controller;

import com.example.stocktrocker.entities.User;
import com.example.stocktrocker.security.JwtUtils;
import com.example.stocktrocker.service.UserService;
//import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.HtmlUtils;
import org.springframework.security.core.Authentication;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")

@RestController

@RequestMapping("/api/users")
public class UserController {
    @Autowired private UserService userService;
    @Autowired private JwtUtils jwtUtils;
    @PostMapping("/register")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        try { user.setUsername(HtmlUtils.htmlEscape(user.getUsername()));

        user.setEmail(HtmlUtils.htmlEscape(user.getEmail()));
            }
            catch (Exception e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }

        return ResponseEntity.status(201).body(userService.addUser(user));
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        try {
            String email = body.get("email");
            String password = body.get("password");

            User user = userService.login(email, password);
            String role = (user.getRole() != null) ? user.getRole().name() : "USER";
            String token = jwtUtils.generateToken(user.getEmail(), role);

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "user", user
            ));

        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of(
                    "message", "שגיאה: פרטי התחברות שגויים"
            ));
        }
    }
    @PostMapping("/deposit")
    public ResponseEntity<?> deposit(
            @RequestParam Double amount,
            Authentication authentication) {

        try {
            String email = authentication.getName();

            User user = userService.getUserByEmail(email);

            if (user == null) {
                return ResponseEntity.status(404).body(
                        Map.of("message", "משתמש לא נמצא")
                );
            }

            Double newBalance = userService.depositMoney(user.getId(), amount);

            return ResponseEntity.ok(
                    Map.of(
                            "message", "ההפקדה בוצעה בהצלחה",
                            "balance", newBalance
                    )
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );

        } catch (Exception e) {

            return ResponseEntity.status(500).body(
                    Map.of("message", "שגיאה: " + e.getMessage())
            );
        }
    }

    @GetMapping("/balance")
    public ResponseEntity<?> getBalance(Authentication authentication) {

        try {

            String email = authentication.getName();

            User user = userService.getUserByEmail(email);

            if (user == null) {
                return ResponseEntity.status(404).body(
                        Map.of("message", "משתמש לא נמצא")
                );
            }

            Double balance = userService.getBalance(user.getId());

            return ResponseEntity.ok(
                    Map.of("balance", balance)
            );

        } catch (Exception e) {

            return ResponseEntity.status(500).body(
                    Map.of("message", "שגיאה: " + e.getMessage())
            );
        }
    }
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }
}