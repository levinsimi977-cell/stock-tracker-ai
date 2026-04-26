package com.example.stocktrocker.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MLService {
    // מחשבת את דיוק התחזית על בסיס השוואה בין ערכים עוקבים
    public double calculateAccuracy(List<Double> data) {
        if (data.size() < 6) return 0;

        int correct = 0;
        int total = data.size() - 1;

        for (int i = 0; i < data.size() - 1; i++) {
            double predicted = data.get(i);
            double actual = data.get(i + 1);

            if (Math.abs(predicted - actual) / actual < 0.05) {
                correct++;
            }
        }

        return (double) correct / total;
    }

    public List<Double> getTrainData(List<Double> data) {
        return data.subList(0, (int)(data.size() * 0.8));
    }

    public List<Double> getTestData(List<Double> data) {
        return data.subList((int)(data.size() * 0.8), data.size());
    }
}