# 📈 Stock Tracker AI 🤖

**Stock Tracker AI** היא מערכת Full-Stack מתקדמת לניהול ומעקב אחרי תיקי השקעות, המשלבת ניתוח שוק חכם מבוסס בינה מלאכותית. המערכת מאפשרת למשתמשים לנהל עסקאות, לעקוב אחרי ביצועי מניות בזמן אמת ולקבל המלצות אנליטיות מפורטות.

---

## 🚀 תכונות עיקריות (Key Features)

- **ניהול תיק השקעות:** קנייה ומכירה של מניות, מעקב אחרי יתרת מזומן וחישוב רווח/הפסד (P&L).
- **ניתוח AI חכם:** אינטגרציה עם מודל ה-LLM של **Qwen 2.5 (via Hugging Face)** לניתוח דוחות כספיים ומגמות שוק.
- **חיזוי מחירים:** שימוש באלגוריתמי רגרסיה לחיזוי מגמות עתידיות על סמך היסטוריית מחירים.
- **אבטחה:** ניהול משתמשים מלא עם **JWT Authentication** והרשאות מבוססות תפקידים.
- **אלגוריתם דירוג:** מנגנון המדרג את המניות המומלצות ביותר על סמך שקלול נתוני שוק ו-AI.

---

## 🛠️ טכנולוגיות (Tech Stack)

### Backend:
- **Java 17** & **Spring Boot 3**
- **Spring Security** (JWT)
- **Spring Data JPA** & **MySQL**
- **Maven** לניהול תלויות.

### AI & Data:
- **Hugging Face Inference API** (Model: `Qwen/Qwen2.5-72B-Instruct`)
- **External Stock APIs** לקבלת נתוני שוק בזמן אמת.

---

## ⚙️ התקנה והרצה (Setup)

1. **שכפול הפרויקט:**
   ```bash
   git clone [https://github.com/levinsimi977-cell/stock-tracker-ai.git](https://github.com/levinsimi977-cell/stock-tracker-ai.git)
   cd stock-tracker-ai
הגדרות סביבה:
יש ליצור קובץ application.properties בנתיב src/main/resources/ ולהוסיף את ההגדרות הבאות (מטעמי אבטחה, קובץ זה אינו כלול במאגר):

Properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
spring.datasource.username=your_username
spring.datasource.password=your_password

# API Keys
gemini.api.key=YOUR_HUGGING_FACE_TOKEN
הרצה:
ניתן להריץ דרך ה-IDE או באמצעות:

Bash
mvn spring-boot:run
🤝 שותפים לפרויקט (Collaborators)
פרויקט זה פותח בשיתוף פעולה מלא על ידי:

Simi Levin 💻

Colleague/Partner Name 💻 (כאן כדאי להחליף לשם של השותפה שלך)

הפרויקט בוצע כחלק מלימודי הנדסת תוכנה מתקדמים (MAAT).

👤 אודותיי
אני מפתחת Full-Stack המתמחה ב-Java ו-Spring Boot, עם תשוקה לשילוב פתרונות AI במערכות מידע מורכבות.
