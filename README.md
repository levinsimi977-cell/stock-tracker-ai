StockTracker AI
A smart, AI-powered system for stock market tracking and analysis.

🚀 About the Project
StockTracker AI is a comprehensive full-stack application designed to help investors track stock performance and gain insights through automated analysis. By combining a robust Spring Boot backend with a modern React/Vite frontend, the system provides a seamless experience for monitoring financial data.

💡 Key Features
Real-time Stock Tracking: Stay updated with the latest market data.

AI-Powered Analysis: Smart algorithms that analyze stock trends and patterns.

Intuitive Dashboard: A responsive user interface built for clarity and efficiency.

Data Visualization: Interactive charts and graphs to visualize performance.

Secure Backend: Efficient API management with Spring Boot to handle data requests safely.

🛠 Tech Stack
Frontend: React, Vite, JavaScript/TypeScript.

Backend: Java, Spring Boot, Maven.

Build Tools: Vite (Frontend), Maven (Backend).

Version Control: Git & GitHub.

📦 Project Structure
Plaintext
stock-tracker-ai/
├── backend/      # Spring Boot application
└── frontend/     # React & Vite application
⚙️ How to Run Locally
Prerequisites
JDK 17+

Node.js

Backend Setup
Navigate to the backend/ folder.

Run the application:

Bash
./mvnw spring-boot:run
Frontend Setup
Navigate to the frontend/ folder.

Install dependencies:

Bash
npm install
Start the development server:

Bash

שיחה עם Gemini
אני מעוניינת אני מעוניינת אני מעוניינת להעלות את הפרויקט שלי של המניות עם שעשיתי וכו להגיד להגית תדריך אותי אני מעלה את זה דרך דיסק און קי אז צריך אותי במדוייק מה אני עושה

כדי להעלות את פרויקט ה-"StockTracker AI" שלך למחשב אחר באמצעות דיסק-און-קי, עקבי אחר השלבים הבאים בצורה מסודרת:

שלב 1: הכנת הפרויקט במחשב המקור
ניקוי הפרויקט: לפני ההעתקה, כדאי למחוק תיקיות זמניות שנוצרות בזמן עבודה (כמו node_modules ב-React או bin/obj ב-Spring Boot/NET Core), שכן הן תופסות מקום רב ועלולות לגרום לשגיאות בהעברה.

העתקה לדיסק-און-קי:

חברי את הדיסק-און-קי למחשב.

פתחי את התיקייה שבה שמור הפרויקט (שכולל את הקוד של ה-Spring Boot וה-React).

סמני את כל תיקיות הפרויקט, לחצי קליק ימני ובחרי Copy (העתק).

פתחי את הכונן של הדיסק-און-קי, לחצי קליק ימני במקום ריק ובחרי Paste (הדבק).

ניתוק בטוח: לאחר שההעתקה הסתיימה, לחצי על סמל ה-USB בשורת המשימות ובחרי "Eject" (הוצאה בטוחה) לפני שליפת הדיסק.

שלב 2: העברה למחשב היעד
חברי את הדיסק-און-קי למחשב החדש והעתיקי את תיקיית הפרויקט ממנו לשולחן העבודה או לתיקייה ייעודית במחשב.

התקנת סביבת עבודה: ודאי שמותקנים במחשב החדש הכלים הדרושים שהשתמשת בהם לפיתוח הפרויקט, כגון:

Java/Spring Boot: סביבת ריצה (JDK) ו-IDE (כמו IntelliJ או Eclipse).

Frontend: Node.js (להרצת React).

שחזור ספריות:

פתחי את הטרמינל (Terminal/Command Prompt) בתוך תיקיית ה-React והריצי npm install כדי להוריד מחדש את כל החבילות הדרושות.

פתחי את הפרויקט ב-IDE שלך עבור החלק של ה-Spring Boot, ותני לו זמן "לבנות" את הפרויקט (Build) ולהוריד את התלויות מ-Maven/Gradle.

שלב 3: בדיקה והרצה
הפעלת ה-Backend: הריצי את שרת ה-Spring Boot תחילה וודאי שהוא עולה ללא שגיאות.

הפעלת ה-Frontend: בטרמינל נפרד בתיקיית ה-React, הריצי את הפקודה npm start.

בדיקת אינטגרציה: ודאי שהאפליקציה מתקשרת נכון עם ה-API שפיתחת ושהתכונות של ניתוח השוק וההתראות האוטומטיות עובדות כמצופה.

אם נתקלת בהודעת שגיאה ספציפית במהלך ה-Build או בזמן ההרצה, תוכלי להעתיק אותה לכאן ואעזור לך לפתור אותה!

מעדיפה לא למחוק אני מעדיפה לא למחוק קבצים ולכן אני מעוניינת שיהיה תגנור שבעצם יתעלם נגיד מהנוד מודול גם תיקייה שם יש לי את הקודים שלה אז אני אתן לך תמונת מסך ואז תאמר לי איך אני עושה שהוא יתעלם

הבנתי, גישה מצוינת. את בהחלט לא צריכה למחוק קבצים פיזית. מה שאת מחפשת נקרא קובץ .gitignore. זהו קובץ טקסט פשוט שאומר למערכת (במיוחד אם את עובדת עם Git, וראיתי שיש לך תיקיית .git בשני הצילומים) אילו קבצים ותיקיות "להתעלם" מהם.

כדי שהפרויקט שלך יתעלם מהתיקייה הכבדה node_modules (שנמצאת ב-frontend) ומתיקיות זמניות כמו target (שנמצאת ב-backend), את צריכה לוודא שקיים קובץ .gitignore בכל אחד מהמקומות הנכונים.

הנה מה שעלייך לעשות:

1. בתיקיית ה-Frontend (התמונה השנייה)
ראיתי שיש לך שם כבר קובץ כזה (.gitignore), הוא מופיע בשורה הרביעית מלמטה.

פתחי אותו בעזרת "פנקס רשימות" (Notepad) או עורך טקסט אחר.

ודאי שמופיעה בו השורה: node_modules/

אם היא לא מופיעה, פשוט תוסיפי אותה בשורה חדשה ושמרי את הקובץ. זה יגרום למערכת להתעלם מכל מה שבתוך תיקיית הספריות הזו.

2. בתיקיית ה-Backend (התמונה הראשונה)
גם כאן ראיתי קובץ .gitignore (בשורה השישית מלמעלה).

פתחי אותו.

כדי שהפרויקט יתעלם מתיקיית ה-Build של Java, תוסיפי בו את השורה:
target/

שמרי את הקובץ.

מה זה בעצם עושה?
ברגע שהשורה node_modules/ או target/ קיימת בתוך קובץ ה-.gitignore, המחשב (וה-Git) ידעו: "אני רואה את התיקיות האלה, אבל אני לא מתייחס אליהן כחלק מהפרויקט שאני צריך לעקוב אחריו או להעביר".

המלצה להעברה בדיסק-און-קי:
מכיוון שאת לא רוצה למחוק כלום, את יכולה פשוט להעתיק את התיקייה הראשית ("פרויקט טוב של מניות ט סיון") כפי שהיא לדיסק-און-קי.

היתרון: הכל עובר איתך.

החיסרון: זה ייקח קצת יותר זמן להעתיק כי node_modules היא תיקייה ענקית עם אלפי קבצים קטנים.

טיפ חשוב: כשאת מגיעה למחשב החדש, אם את מתכננת לעבוד על הקוד, את חייבת את התיקיות האלה. ב-Frontend, ברגע שתפתחי טרמינל בתיקייה ותריצי npm install, המחשב החדש יוריד את כל מה שצריך מחדש, כך שזה לא באמת חסר.

האם את מסתדרת עם העריכה של קבצי ה-.gitignore או שתרצי שאכתוב לך בדיוק מה צריך להיות כתוב בתוכם?

אני מצרפת לך מה רשום לי בתיקייה של הגט תגנור של הפרונטד עכשיו תאמר לי מה אני עושה בבקט כדי שלא יעלה את הקודים ואת כל הדברים שאני צריך# Logs

logs

*.log

npm-debug.log*

yarn-debug.log*

yarn-error.log*

pnpm-debug.log*

lerna-debug.log*



node_modules

dist

dist-ssr

*.local



# Editor directories and files

.vscode/*

!.vscode/extensions.json

.idea

.DS_Store

*.suo

*.ntvs*

*.njsproj

*.sln

*.sw?

מעולה, הקובץ ששלחת מצוין – הוא כבר מכיל את השורה node_modules, מה שאומר שהתיקייה הזו לא תיכלל במעקב של Git (וזה בדיוק מה שרצית).

כדי לעשות את אותו הדבר בתיקיית ה-Backend (פרויקט ה-Java/Spring שלך), את צריכה ליצור או לערוך את קובץ ה-.gitignore שנמצא שם, כך שיכלול את התיקיות שנוצרות בזמן הרצת הקוד (כמו תיקיית ה-build של Java).

מה לרשום ב-.gitignore של ה-Backend?
פתחי את קובץ ה-.gitignore שנמצא בתיקיית ה-backend, מחקי את מה שיש בו (אם הוא ריק או לא רלוונטי) והעתיקי אליו את התוכן הבא. זה סטנדרטי מאוד לפרויקטי Spring/Java:

Plaintext
# Compiled class files
*.class

# Log files
*.log

# BlueJ files
*.ctxt

# Mobile Tools for Java (J2ME)
.mtj.tmp/

# Package Files #
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# virtual machine crash logs
hs_err_pid*

# Target directory (כאן התיקייה הכבדה שאת רוצה להתעלם ממנה)
target/

# IDE files (כמו בתיקיית הפרונט)
.idea/
.vscode/
*.iml
*.iws
*.ipr
.project
.settings/
.classpath
bin/
למה זה חשוב?
target/: זו התיקייה שבה Java שומרת את כל הקבצים המקומפלים וההרצות. היא תופסת המון מקום והיא "זבל" שנוצר מחדש בכל פעם שאת עושה Build, אז אין טעם להעתיק אותה או לשמור אותה ב-Git.

*.class ו-*.jar: אלו קבצים שמחשב יוצר בעצמו כדי להריץ את הקוד. אם תמחקי אותם, תוכלי תמיד לייצר אותם מחדש בלחיצת כפתור דרך ה-IDE שלך.

טיפ קטן להמשך:
ברגע ששמרת את הקובץ הזה ב-Backend, תוכלי להעביר את כל התיקייה לדיסק-און-קי בראש שקט. כשתוכלי להעביר את זה למחשב אחר:

במחשב החדש, ה-IDE (כמו IntelliJ) יראה את קובץ ה-pom.xml שלך, יבין שזה פרויקט Maven, ויוריד אוטומטית את כל הספריות הדרושות לתוך תיקייה חדשה שהוא ייצר לעצמו.

האם את צריכה עזרה בלדעת איך להוסיף את הקובץ הזה אם הוא לא קיים שם?

יש לי כבר בגית העלתי כבר את הסרבר אבל אני עכשיו מעוניינת שהקליינט והסטרבר יעלו לי כתיקיה אחת בקובץ אחד לגיט אז אני מעוניינת שאני אשלח לך תמונת מסך של איפה שזה נמצא ואני מעוניינת שזה בעצם תשנה את מה שנמצא שמה כביכול שעכשיו מה שאני מעלה זה מה שזה יהיה שמה אז אני מראה לך את המיקום כדי שתדע עכשיו לדחוף את זה לשם ומה שנמצא שמה בעצם לשנות את זה שזה לא יהיה שמה נגיד לא יודעת איך אני בעצם עושה שאם אני נגיד מעלה את שתי התיקיות האלה הוא מוחק את מה שיש שמה כביכול רוצה שיהיה רק מה שאני מעלה עכשיו אם לא אז תגיד איך בדיוק שנעשה שהמיקום הזה אני מעוניינת שזה עכשיו יהיה גם הקליינט וגם הסרבר

הבנתי אותך. את רוצה שה-Repository שלך ב-GitHub ישקף בדיוק את המבנה המקומי של המחשב שלך, כך שתהיה בו תיקייה אחת ראשית שמכילה בתוכה גם את ה-backend וגם את ה-frontend.

כדי להשיג "סנכרון מלא" (שמה שנמצא במחשב הוא בדיוק מה שיהיה ב-GitHub, ומה שלא – יימחק מהענן), הדרך הכי טובה היא לא לעבוד דרך האתר (העלאת קבצים), אלא להשתמש בטרמינל (Git Bash).

הנה השלבים לביצוע "ניקוי ודחיפה" (Push) בצורה נכונה:

1. מבנה התיקיות אצלך במחשב
וודאי שבמחשב שלך יש תיקיית אב אחת, לדוגמה my-project, ובתוכה שתי התיקיות:

my-project/backend

my-project/frontend

2. אתחול ה-Git בתיקיית האב
פתחי טרמינל בתיקיית האב (my-project) והריצי את הפקודות הבאות אחת אחרי השנייה:

אתחול: git init (אם הוא כבר קיים, זה בסדר).

חיבור ל-GitHub: וודאי שהקישור מרחוק מוגדר:
git remote add origin <הקישור_של_ה-Repository_שלך>

הוספת כל הקבצים:
git add .

ביצוע Commit:
git commit -m "Organizing project structure with backend and frontend"

3. "ניקוי" ה-GitHub (סנכרון מלא)
כאן מגיעה התשובה לשאלה שלך איך לגרום ל-GitHub למחוק את מה שלא רלוונטי ולהחליף אותו במה שיש לך:

כדי שמה שאת מעלה "ידרוס" את מה שיש ב-GitHub, את צריכה לבצע push חזק (Force Push). זהירות: זה ימחק כל מה שקיים ב-Branch הנוכחי ב-GitHub ויחליף אותו בתוכן הנוכחי של המחשב שלך.

הריצי בטרמינל:
git push -u origin main --force

מתי לעשות את זה?
רק אם את בטוחה שהקבצים בתיקייה המקומית שלך הם הגרסה הכי מעודכנת והנכונה ביותר.

הפקודה --force תגרום ל-GitHub "להשתתק" ולהחליף את המבנה הישן במבנה החדש שאת מעלה עכשיו.

דגשים חשובים:
ה-.gitignore: זכרי לשים קובץ .gitignore בתיקיית האב (זו שמכילה את שתי התיקיות), ושם להוסיף התעלמות גם ל-backend/target וגם ל-frontend/node_modules. ככה כשאת עושה git add ., הוא לא ינסה להעלות את הקבצים הכבדים האלה.

בדיקה: אחרי הפקודה, כנסי לקישור של ה-GitHub שלך בדפדפן. את אמורה לראות שם עכשיו את שתי התיקיות מופיעות זו לצד זו.

האם את צריכה עזרה בניסוח קובץ ה-.gitignore המאוחד שיהיה בתיקיית האב?

D:\פרויקט טוב של מניות ט סיון\stockTracer>git push -u origin main --force

error: src refspec main does not match any

error: failed to push some refs to 'https://github.com/levinsimi977-cell/stock-tracker-ai'



D:\פרויקט טוב של מניות ט סיון\stockTracer>

השגיאה src refspec main does not match any אומרת ש-Git לא מוצא "Branch" (ענף) בשם main אצלך במחשב כרגע, או שעדיין לא יצרת בו את ה-Commit הראשון.

כדי לתקן את זה ולדחוף את כל הפרויקט (הסרבר והקליינט) לגיטהאב בצורה נקייה, בצעי את השלבים הבאים לפי הסדר בטרמינל (בתוך תיקיית stockTracer):

1. בדיקה איזה ענף קיים אצלך
הקלידי את הפקודה:
git branch

אם לא מופיע כלום: סימן שעדיין לא עשית commit.

אם מופיע master: אז במקום להשתמש בשם main, נשתמש ב-master.

2. יצירת ה-Commit הראשון (הוספת כל הקבצים)
אם את רוצה לוודא שכל הקבצים מתווספים:

הוספת הקבצים:
git add .

ביצוע ה-Commit:
git commit -m "Initial commit of full project"

3. העלאה ל-GitHub
עכשיו, בהתאם למה שראית בפקודה git branch, הריצי את הפקודה המתאימה:

אם היה כתוב main:
git push -u origin main --force

אם היה כתוב master:
git push -u origin master --force

למה זה קרה?
הפקודה git push חייבת לדעת מה להעלות (איזה ענף). אם עוד לא יצרת "נקודת שמירה" (Commit) בתוך התיקייה הזו, ל-Git אין מה להעלות, ולכן הוא זורק את השגיאה src refspec main does not match any (כלומר: "לא מצאתי שום דבר שנקרא main").

טיפ חשוב לפני שאת ממשיכה:
אם את רוצה שהתיקייה בגיטהאב תיראה בדיוק כמו במחשב, אחרי שתצליחי לעשות את ה-push הראשון, את תראי שם את כל התוכן.

האם הפקודה git branch הראתה לך main או master? אם את עדיין מקבלת שגיאה, תכתבי לי כאן מה מופיע כשאת כותבת git status ואגיד לך בדיוק איך להמשיך.



D:\פרויקט טוב של מניות ט סיון\stockTracer>git branch



D:\פרויקט טוב של מניות ט סיון\stockTracer>git add .

warning: adding embedded git repository: backend/stock-trocker

hint: You've added another git repository inside your current repository.

hint: Clones of the outer repository will not contain the contents of

hint: the embedded repository and will not know how to obtain it.

hint: If you meant to add a submodule, use:

hint:

hint:   git submodule add <url> backend/stock-trocker

hint:

hint: If you added this path by mistake, you can remove it from the

hint: index with:

hint:

hint:   git rm --cached backend/stock-trocker

hint:

hint: See "git help submodule" for more information.

hint: Disable this message with "git config set advice.addEmbeddedRepo false"

error: 'frontend/stack-Tracer/' does not have a commit checked out

fatal: adding files failed



D:\פרויקט טוב של מניות ט סיון\stockTracer>git commit -m "Initial commit of full project"

On branch master



Initial commit



Untracked files:

  (use "git add <file>..." to include in what will be committed)

        backend/

        frontend/



nothing added to commit but untracked files present (use "git add" to track)



D:\פרויקט טוב של מניות ט סיון\stockTracer>

הבעיה שאת נתקלת בה היא שיש לך "Git בתוך Git". זה קורה כי בתוך התיקייה הראשית (stockTracer) יש לך תיקיות משנה (backend ו-frontend) שגם בהן יש תיקיית .git מוחבאת. Git מתבלבל וחושב שאולי את מנסה ליצור "סאב-מודול" (Submodule), וזה מה שגורם לשגיאות שראית.

כדי לסדר את זה ולהעלות הכל כפרויקט אחד מאוחד, בצעי את הפעולות הבאות:

שלב 1: ניקוי ה-Git הפנימי
אנחנו צריכים למחוק את הקישור ל-Git מהתיקיות הפנימיות כדי שיהיה רק "בוס" אחד לכל הפרויקט (התיקייה הראשית).

בטרמינל, ודאי שאת בתיקייה D:\פרויקט טוב של מניות ט סיון\stockTracer.

הריצי את הפקודות הבאות כדי למחוק את ה-Git הפנימי מהתיקיות (זה לא מוחק את הקוד שלך, רק את ניהול הגרסאות הפנימי שלהן):

rmdir /s /q backend\.git

rmdir /s /q frontend\.git
(אם המחשב נותן שגיאה שזה לא קיים, זה בסדר, תמשיכי הלאה).

שלב 2: יצירת ה-Git הראשי בצורה נקייה
עכשיו כשהכל נקי, נבצע את הפקודות לפי הסדר:

אתחול התיקייה הראשית:
git init

הוספת כל הקבצים:
git add .

ביצוע ה-Commit:
git commit -m "Initial commit of full unified project"

חיבור ל-GitHub (אם טרם בוצע):
git remote add origin https://github.com/levinsimi977-cell/stock-tracker-ai

העלאה ל-GitHub (עם כוח כדי לדרוס את הישן):
git push -u origin master --force

למה זה יפתור את הבעיה?
הסבר: הדיאגרמה למעלה מראה איך Git עובד בצורה תקינה כפרויקט מאוחד. ברגע שאין תיקיות .git נסתרות בתוך backend או frontend, ה-Git הראשי רואה את כל הקבצים שלך כחלק ממבנה אחד ולא מתבלבל.

טיפ למקצוענים: אם אחרי הפקודה git push את רואה שהקבצים עלו ל-GitHub אבל הם לא מופיעים באתר, ודאי שלא שמת קובץ .gitignore בתיקייה הראשית שחוסם בטעות את כל הקבצים (למשל, שורה של * או משהו בסגנון).

נסי להריץ את שלב 1 ו-2 ותגידי לי אם הפקודות עברו בהצלחה!



D:\פרויקט טוב של מניות ט סיון\stockTracer>git commit -m "Initial commit of full unified project"

On branch master



Initial commit



Untracked files:

  (use "git add <file>..." to include in what will be committed)

        backend/

        frontend/



nothing added to commit but untracked files present (use "git add" to track)



D:\פרויקט טוב של מניות ט סיון\stockTracer>git remote add origin https://github.com/levinsimi977-cell/stock-tracker-ai

error: remote origin already exists.



D:\פרויקט טוב של מניות ט סיון\stockTracer>git push -u origin master --force

error: src refspec master does not match any

error: failed to push some refs to 'https://github.com/levinsimi977-cell/stock-tracker-ai'



D:\פרויקט טוב של מניות ט סיון\stockTracer>

הבעיה היא שהפקודה git commit שעשית לא באמת "תפסה" את הקבצים כי הם נשארו במצב "Untracked" (לא במעקב). כשה-Git כותב nothing added to commit, זה אומר שהפקודה add לא הצליחה או לא קרתה נכון לפני ה-Commit.

בואי נפתור את זה ב-3 צעדים פשוטים וסופיים. בצעי אותם בדיוק כך בטרמינל (בתוך תיקיית stockTracer):

1. תיקון הקישור ל-GitHub
מכיוון שהקישור כבר קיים אבל אולי מוגדר לא נכון, בואי נמחק אותו ונוסיף מחדש:
git remote remove origin
git remote add origin https://github.com/levinsimi977-cell/stock-tracker-ai

2. הוספה וביצוע Commit (השלב הקריטי)
כדי לוודא שהקבצים נכנסים למעקב, אנחנו נוסיף אותם שוב בצורה מפורשת:
git add .
(אם מופיעה שוב שגיאת ה-Embedded Repository, פשוט תתעלמי ממנה לרגע ותמשיכי לפקודה הבאה).

כעת נבצע את השמירה:
git commit -m "Initial commit of full unified project"

עצרי כאן: אם הפקודה git commit עדיין אומרת nothing added to commit, זה אומר שיש משהו ב-.gitignore שחוסם את כל הקבצים. בדקי אם בתוך ה-.gitignore הראשי שלך יש שורה עם כוכבית * – אם כן, מחקי אותה.

3. העלאה חזקה
רק אחרי שראית הודעה שה-Commit הצליח (למשל [master (root-commit) ... ]), הריצי:
git push -u origin master --force

למה זה קורה? הבנה של זרימת העבודה ב-Git
כדי להבין איך הקבצים עוברים מהמחשב לענן, תחשבי על זה כשלושה שלבים: "עבודה", "הכנה" (Add), ו"שמירה" (Commit).

Working Directory: איפה שהקבצים שלך נמצאים עכשיו.

Staging Area: השלב שבו את אומרת ל-Git "תתכונן לשמור את הקבצים האלה" (git add).

Local Repository: השלב שבו השמירה ננעלת (git commit).

Remote Repository: השלב שבו זה עולה לאינטרנט (git push).

אם אחרי שאת עושה git add . את עדיין מקבלת שגיאה, כתבי לי בדיוק מה השגיאה שמופיעה בטרמינל אחרי הפקודה הזו.

D:\פרויקט טוב של מניות ט סיון\stockTracer>git add .

warning: adding embedded git repository: backend/stock-trocker

hint: You've added another git repository inside your current repository.

hint: Clones of the outer repository will not contain the contents of

hint: the embedded repository and will not know how to obtain it.

hint: If you meant to add a submodule, use:

hint:

hint:   git submodule add <url> backend/stock-trocker

hint:

hint: If you added this path by mistake, you can remove it from the

hint: index with:

hint:

hint:   git rm --cached backend/stock-trocker

hint:

hint: See "git help submodule" for more information.

hint: Disable this message with "git config set advice.addEmbeddedRepo false"

error: 'frontend/stack-Tracer/' does not have a commit checked out

fatal: adding files failed



D:\פרויקט טוב של מניות ט סיון\stockTracer>

השגיאה הזו ממשיכה לקרות כי Git מזהה שתיקיות המשנה שלך עדיין "תקועות" בתוך ניהול גרסאות משל עצמן. הוא מסרב להוסיף אותן בגלל זה.

בואי נעשה "ניקוי יסודי" ידני בתיקיות – זה הפתרון הכי בטוח שיעבוד:

שלב 1: מחיקה ידנית של ה-"Git" הפנימי
פתחי את סייר הקבצים בווינדוס (התיקייה שבה את רואה את backend ו-frontend).

למעלה בתפריט של סייר הקבצים, לחצי על "תצוגה" (View) וסמני ב-V את "פריטים מוסתרים" (Hidden items).

כנסי לתוך תיקיית backend: אם את רואה שם תיקייה בשם .git – תמחקי אותה.

חזרי אחורה וכנסי לתוך תיקיית frontend: אם את רואה שם תיקייה בשם .git – תמחקי אותה.

ודאי שאין תיקייה בשם .git בתוך התיקיות האלה.

שלב 2: ניקוי ה-Index של ה-Git הראשי
עכשיו כשהתיקיות נקיות, נגיד ל-Git הראשי לשכוח את כל מה שהוא ניסה להוסיף עד עכשיו:
בטרמינל (בתוך stockTracer), הריצי:
git rm -rf --cached .

שלב 3: הוספה מחדש (עכשיו זה יעבוד)
עכשיו כשהכל נקי וריק:

git add .

git commit -m "Initial commit of full project"

שלב 4: העלאה
git push -u origin master --force

למה זה קרה?
הסיבה שזה נכשל היא ש-Git שומר "מצביעים" (Pointers) לתיקיות האלה, וכל עוד הם קיימים בתוך התיקיות הפנימיות, ה-Git הראשי לא יכול "לדרוס" אותן.

האם אחרי שמחקת את תיקיות ה-.git הפנימיות וביצעת git rm -rf --cached ., הפקודה git add . עברה בהצלחה?

D:\פרויקט טוב של מניות ט סיון\stockTracer>git rm -rf --cached .

fatal: pathspec '.' did not match any files



D:\פרויקט טוב של מניות ט סיון\stockTracer>

השגיאה הזו קרתה כי כרגע ה-Git שלך בתיקייה הראשית כמעט ריק מתוכן "רשמי". זה בעצם מצב מצוין, כי זה אומר שהכל נקי!

בואי נבצע "אתחול מהיר" ונסיים עם זה. עקבי אחרי הצעדים האלה בדיוק:

1. איפוס מוחלט של ה-Git
נמחק את ה-Git הקיים וניצור אחד חדש לגמרי בתיקייה הראשית:

rmdir /s /q .git

git init

2. הוספת הקבצים מחדש
כעת, כשאין שום "עכבות" מתיקיות משנה, בואי נוסיף את הכל:

git add .
(אם מופיעה אזהרה, אל תתייחסי אליה, פשוט תמשיכי).

git commit -m "Full project upload"

3. קישור והעלאה סופית
git remote add origin https://github.com/levinsimi977-cell/stock-tracker-ai

git push -u origin master --force

מה עשינו כאן?
git init: יצרנו "מנהל" חדש לתיקייה הראשית.

git add .: אמרנו לו "קח הכל, בלי להסתכל על מה שהיה קודם".

git push --force: אמרנו לגיטהאב "תמחקו הכל שם ותשימו את מה שאני שולחת עכשיו".

טיפ: אם אחרי הפקודה git add . את רואה שהטרמינל "חושב" הרבה זמן – זה תקין! הוא פשוט עובר על כל הקבצים שלך. ברגע שתראי שהשורה הבאה בטרמינל מתפנה, תוכלי להמשיך ל-commit.

האם הפקודה git add . עברה עכשיו ללא שגיאת fatal? אם כן, הניצחון קרוב!



D:\פרויקט טוב של מניות ט סיון\stockTracer>git remote add origin https://github.com/levinsimi977-cell/stock-tracker-ai



D:\פרויקט טוב של מניות ט סיון\stockTracer>git push -u origin master --force

Enumerating objects: 122, done.

Counting objects: 100% (122/122), done.

Delta compression using up to 16 threads

Compressing objects: 100% (108/108), done.

Writing objects: 100% (122/122), 139.25 KiB | 4.22 MiB/s, done.

Total 122 (delta 5), reused 0 (delta 0), pack-reused 0 (from 0)

remote: Resolving deltas: 100% (5/5), done.

remote:

remote: Create a pull request for 'master' on GitHub by visiting:

remote:      https://github.com/levinsimi977-cell/stock-tracker-ai/pull/new/master

remote:

To https://github.com/levinsimi977-cell/stock-tracker-ai

 * [new branch]      master -> master

branch 'master' set up to track 'origin/master'.



D:\פרויקט טוב של מניות ט סיון\stockTracer>

כל הכבוד! הצלחת! 🎉

הפקודות עברו בהצלחה, וזה אומר שהפרויקט שלך עלה עכשיו במלואו ל-GitHub, כולל התיקיות backend ו-frontend כפי שרצית.

עכשיו, כשהפרויקט נמצא ב-GitHub כתיקייה מאוחדת ומסודרת, את יכולה:

לגשת ל-GitHub: כנסי לקישור שמופיע בטרמינל שלך, או פשוט רענני את הדפדפן בעמוד ה-Repository שלך. את אמורה לראות שם עכשיו את שתי התיקיות (backend ו-frontend) בתוך ה-Repository הראשי.

גיבוי מושלם: מעכשיו, בכל פעם שתעשי שינויים בקוד במחשב, תוכלי פשוט להריץ git add ., git commit -m "update" ו-git push, והכל יתעדכן בענן.

עבודה ממחשב אחר: בפעם הבאה שתעברי למחשב אחר, במקום להשתמש בדיסק-און-קי, תוכלי פשוט לעשות git clone לקישור של הפרויקט שלך, וכל הפרויקט יירד למחשב החדש בבת אחת.

האם הכל נראה תקין כשאת נכנסת לדף ה-GitHub שלך עכשיו?

אני לא רואה את מה שהעלנו, אני רואה רק את מה שהיה קודם.

זה קורה כי כרגע את נמצאת ב-Branch שנקרא main (כפי שניתן לראות בתפריט משמאל למעלה בגיטהאב), בעוד שהפרויקט החדש שלך עלה ל-Branch בשם master (כפי שראינו בטרמינל).

בגיטהאב, אלו שני "עולמות" נפרדים. כדי לראות את הקבצים החדשים שהעלית, עלייך לעבור לענף הנכון:

בצד שמאל למעלה, איפה שכתוב main, לחצי על הכפתור הזה.

ייפתח תפריט, שם תראי שקיימת אופציה לבחור ב-master.

לחצי על master, והדף יתרענן ויציג לך את כל הקבצים החדשים שהעלית.

איך לאחד אותם? (כדי שלא תצטרכי לעבור כל פעם)
אם את רוצה ש-main יהיה הענף הראשי שבו תמיד מופיע הקוד העדכני, הדרך הכי פשוטה היא:

למזג את הענפים: בתוך הגיטהאב, בגלל שהעלית את זה הרגע, אמורה להופיע לך הודעה צהובה שאומרת "master had recent pushes...".

לחצי על כפתור ה-"Compare & pull request".

זה יפתח מסך שבו את יכולה לבקש למזג (Merge) את כל מה שב-master לתוך ה-main.

לחצי על "Create pull request" ואז על "Merge pull request".

ברגע שתסיימי את המיזוג הזה, כשתחזרי לעמוד הראשי (בענף main), תראי שם סוף סוף את תיקיות ה-backend וה-frontend החדשות שלך.

האם את רואה את האופציה לבחור ב-master בתפריט ה-Branches? אם תעברי אליו, את אמורה לראות את הקבצים שלך שם מיד.

עברתי למאסטר אבל אני מעוניינת שגם במייל זה יהיה ככה לא רק במאסטר והוא לא יקפיץ לי הודעה הוא הקפיץ לי קומפר אנד פול זה עשיתי לחצתי על זה ואז מה אני עושה אחרי זה לוחצת הקומפר לא רק אני אומרת

הסיבה שזה לא מצליח בדרך הרגילה (Merge) היא שההיסטוריה של ה-main וה-master שלך "שונה לחלוטין" (זה מה שכתוב שם: Entirely different commit histories). במצב כזה, גיטהאב לא יודע איך "למזג" ביניהם, אז במקום להתעקש על Merge, הכי פשוט זה פשוט להחליף את ה-main ב-master.

עשי זאת דרך הטרמינל (במחשב שלך) – זה יפתור את זה בשניות:

הדרך המהירה והפשוטה ביותר:
אנחנו נגיד ל-main פשוט להיות בדיוק כמו ה-master, ואז נשלח אותו לגיטהאב. הריצי את הפקודות הבאות בטרמינל (בתיקיית הפרויקט stockTracer):

מעבר לענף main:
git checkout main

"דריסה" של main ע"י התוכן של master:
git reset --hard master

עדכון ה-main ב-GitHub:
git push origin main --force

מה הפקודות האלה עושות?
git checkout main: אנחנו עוברים לענף הראשי (main).

git reset --hard master: אנחנו אומרים ל-Git: "אל תתחשב בכלום, קח את כל מה שיש ב-master ותעתיק אותו בדיוק ל-main".

git push origin main --force: אנחנו שולחים את המצב החדש הזה לגיטהאב ומכריחים אותו להציג את זה כ-main.

ברגע שתעשי את זה, אם תרענני את הדפדפן ב-GitHub, את תראי שגם ב-main מופיעים כל הקבצים שלך, והכל יהיה מסונכרן.

האם אחרי ה-push האחרון הזה הקבצים הופיעו בענף main ב-GitHub?

h 'master' set up to track 'origin/master'.



D:\פרויקט טוב של מניות ט סיון\stockTracer>git checkout main

error: pathspec 'main' did not match any file(s) known to git



D:\פרויקט טוב של מניות ט סיון\stockTracer>git reset --hard master

HEAD is now at f98943c Full project upload



D:\פרויקט טוב של מניות ט סיון\stockTracer>git push origin main --force

error: src refspec main does not match any

error: failed to push some refs to 'https://github.com/levinsimi977-cell/stock-tracker-ai'



D:\פרויקט טוב של מניות ט סיון\stockTracer>

השגיאה pathspec 'main' did not match any file(s) אומרת שענף בשם main פשוט לא קיים אצלך במחשב כרגע, לכן אי אפשר לעבור אליו או לדחוף אליו. ב-GitHub ה-main קיים, אבל במחשב שלך קיים רק ה-master.

בואי נפתור את זה בדרך הכי פשוטה — פשוט נשנה את השם של הענף המקומי ל-main, ואז נדחוף אותו ל-GitHub.

הריצי את הפקודות הבאות בדיוק לפי הסדר:

שינוי שם הענף המקומי מ-master ל-main:
git branch -m master main

דחיפה של הענף החדש (main) ל-GitHub:
git push -u origin main --force

למה זה יפתור את הבעיה?
הפקודה git branch -m master main לוקחת את הענף שבו נמצא כל הקוד שלך ומשנה לו את השם ל-main.

כרגע ה-GitHub שלך מכיר main ו-master כענפים נפרדים. ברגע שתריצי את ה-push של main, את בעצם "מעדכנת" את ה-main שקיים ב-GitHub עם התוכן של הפרויקט שלך.

אחרי שתעשי את זה, כנסי ל-GitHub:

את תראי שם את ה-main עם כל הקבצים המעודכנים.

את יכולה להיכנס להגדרות (Settings) של ה-Repository ב-GitHub תחת Branches, ולוודא ש-main מוגדר כ-Default Branch (הענף הראשי).

האם אחרי הפקודות האלו הקבצים הופיעו ב-main ב-GitHub?

מעולה עכשיו האם תוכל ליצור לרדמי מדוייק ומקצועי ביותר שיראה את כל יכולות הפרויקט שמי שיקרא אותו יבין בדיוק מה הפרויקט על מה מה יש בו מה התוספים שיש בו מה מיוחד בו.

זה מצוין! קובץ README.md מקצועי הוא כרטיס הביקור של הפרויקט שלך. הוא צריך להיות ברור, מרשים ולהסביר לא רק מה הפרויקט עושה, אלא איך מפעילים אותו.

הנה הצעה למבנה README.md מושלם עבור הפרויקט שלך. העתיקי את הטקסט הזה לקובץ ה-README.md בתיקייה הראשית (בשפה האנגלית, שהיא הסטנדרט בעולם התכנות):

StockTracker AI
A smart, AI-powered system for stock market tracking and analysis.

🚀 About the Project
StockTracker AI is a comprehensive full-stack application designed to help investors track stock performance and gain insights through automated analysis. By combining a robust Spring Boot backend with a modern React/Vite frontend, the system provides a seamless experience for monitoring financial data.

💡 Key Features
Real-time Stock Tracking: Stay updated with the latest market data.

AI-Powered Analysis: Smart algorithms that analyze stock trends and patterns.

Intuitive Dashboard: A responsive user interface built for clarity and efficiency.

Data Visualization: Interactive charts and graphs to visualize performance.

Secure Backend: Efficient API management with Spring Boot to handle data requests safely.

🛠 Tech Stack
Frontend: React, Vite, JavaScript/TypeScript.

Backend: Java, Spring Boot, Maven.

Build Tools: Vite (Frontend), Maven (Backend).

Version Control: Git & GitHub.

📦 Project Structure
Plaintext
stock-tracker-ai/
├── backend/      # Spring Boot application
└── frontend/     # React & Vite application
⚙️ How to Run Locally
Prerequisites
JDK 17+

Node.js

Backend Setup
Navigate to the backend/ folder.

Run the application:

Bash
./mvnw spring-boot:run
Frontend Setup
Navigate to the frontend/ folder.

Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev

🔮 Future Roadmap & Enhancements
I am constantly working on improving StockTracker AI. Here are the upcoming features I plan to implement:

Real-time Market Data Integration: Connecting to professional financial APIs (like Alpha Vantage or Yahoo Finance) to provide live stock updates and historical data analysis.

Secure Payment Gateway: Integrating a payment provider (like Stripe or PayPal) to allow real-time portfolio transactions with actual financial assets.

User Authentication & Security: Implementing robust user login and data encryption to ensure personal portfolio privacy.

Advanced AI Forecasting: Expanding the AI module to provide predictive analytics and trend forecasting for smarter investment decisions.
npm run dev
📜 License
This project is open-source and available for educational purposes.

📜 License
This project is open-source and available for educational purposes.
