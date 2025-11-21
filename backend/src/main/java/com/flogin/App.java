package com.flogin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App {

    public static void main(String[] args) {
        SpringApplication.run(App.class, args); // Khởi chạy Spring Boot
        System.out.println("Backend Spring Boot đang chạy...");
    }
}
