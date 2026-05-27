package com.example.stocktrocker.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Map;



import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class AIService {

    @Value("${gemini.api.key}")
    private String apiKey;
    private final String URL = "https://router.huggingface.co/v1/chat/completions";

    public String summarizeReports(String prompt) {

        RestTemplate restTemplate = new RestTemplate();
        String instruction = """
אתה אנליסט מקצועי בשוק ההון.

חוקים חשובים:
- החזר תשובה בעברית בלבד.
- מותר להשתמש רק בעברית ובאנגלית.
- אסור להשתמש בסינית, רוסית, ערבית או כל שפה אחרת.
- אם נוצרה שפה אחרת → תקן אותה לעברית.
- אין להשתמש בתווים סיניים כלל.

- השתמש רק במונחים:
קנייה / מכירה / החזקה

- אסור להשתמש:
BUY / SELL / HOLD

- ההמלצה חייבת להיות עקבית עם הנתונים.
- אם המומנטום שלילי והתחזית עתידית חיובית → המלץ על החזקה.
- אם הסיכון גבוה והמומנטום שלילי → המלץ על מכירה או החזקה בלבד.

מבנה חובה:
1. מגמת שוק
2. רמת סיכון
3. מומנטום
4. תנודתיות
5. המלצה
6. הסבר קצר
7. רמת ביטחון

החזר תשובה קצרה, מקצועית, נקייה ובעברית בלבד.
""" + prompt;
        Map<String, Object> message = Map.of(
                "role", "user",
                "content", instruction
        );
        Map<String, Object> requestBody = Map.of(
                "model", "Qwen/Qwen2.5-72B-Instruct",
                "messages", List.of(message),
                "max_tokens", 500,
                "temperature", 0.2
        );
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            System.out.println("שולח בקשה למודל Qwen החכם בעברית...");

            Map response = restTemplate.postForObject(URL, request, Map.class);

            if (response != null && response.containsKey("choices")) {
                List choices = (List) response.get("choices");
                Map firstChoice = (Map) choices.get(0);
                Map messageObj = (Map) firstChoice.get("message");
                String result = (String) messageObj.get("content");

                result = result.replace("**", "")
                        .replace("###", "")
                        .replace("\n", " ")
                        .trim();

                System.out.println("ה-AI החזיר בעברית: " + result);
                return result;
            }
            return "לא התקבלה תשובה מ-Hugging Face.";

        } catch (Exception e) {

            System.err.println("AI ERROR: " + e.getMessage());

            return "AI_ANALYSIS_TEMPORARILY_UNAVAILABLE";
        }
    }
}