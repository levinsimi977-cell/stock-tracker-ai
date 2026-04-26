package com.example.stocktrocker.service;

import com.example.stocktrocker.entities.*;
import com.example.stocktrocker.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
@Service
@Transactional // מבטיח שכל פעולה כספית היא "הכל או כלום"
public class UserService {

    @Autowired private UserRepo userRepo;
    @Autowired private StockRepo stockRepo;
    @Autowired private TransactionRepo transactionRepo;
    @Autowired private StockOwnershipRepo stockOwnershipRepo;
    @Autowired private PasswordEncoder passwordEncoder;

    @Autowired private JavaMailSender mailSender;

    public User addUser(User user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new RuntimeException("שגיאה: האימייל כבר קיים!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setBalance(10000.0);
        user.setValueStock(0.0);

        User savedUser = userRepo.save(user);

        // שליחת מייל לאחר שמירת המשתמש בהצלחה
        sendWelcomeEmail(savedUser.getEmail(), savedUser.getUsername());

        return savedUser;
    }

    private void sendWelcomeEmail(String toEmail, String firstName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            // true מציין שאנחנו רוצים הודעת Multi-part (תומך בעברית וקבצים)
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("stocktrocker@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject("ברוך הבא ל-StockTrocker!");

            String content = "<html><body>" +
                    "<h3>שלום " + firstName + ",</h3>" +
                    "<p>שמחים שהצטרפת למערכת ניהול המניות שלנו.</p>" +
                    "<p>החשבון שלך הופעל עם יתרה ראשונית של <b>10,000$</b>.</p>" +
                    "<p>בהצלחה בהשקעות!</p>" +
                    "</body></html>";

            helper.setText(content, true); // true אומר שזה תוכן HTML

            mailSender.send(message);
            System.out.println("המייל נשלח בהצלחה ל-" + toEmail);

        } catch (Exception e) {
            System.err.println("נכשלה שליחת מייל ל-" + toEmail + ": " + e.getMessage());
            e.printStackTrace(); // זה ידפיס לנו את כל ה-Stack Trace במידה ויש שגיאה
        }
    }
    public User login(String email, String password) {
        User u = userRepo.findByEmail(email);
        // השוואת סיסמה מוצפנת
        if (u == null || !passwordEncoder.matches(password, u.getPassword())) {
            throw new RuntimeException("שגיאה: פרטי התחברות שגויים");
        }
        return u;
    }
    public User getUserByEmail(String email) {
        User u = userRepo.findByEmail(email);
        if (u == null) throw new RuntimeException("משתמש לא נמצא");
        return u;
    }
    public User updateUser(String email, User updatedUser) {
        User existingUser = getUserByEmail(email);
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setEmail(updatedUser.getEmail());
        return userRepo.save(existingUser);
    }


    public void deleteUser(Long userId) {
        userRepo.deleteById(userId);
    }
}