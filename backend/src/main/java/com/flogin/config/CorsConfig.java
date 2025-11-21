package com.flogin.config; // Đổi package cho phù hợp

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Áp dụng CORS cho tất cả các endpoint dưới /api
            .allowedOrigins("http://localhost:5173") // Chỉ cho phép nguồn gốc của Frontend (Vite/React mặc định là 5173)
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Cho phép các phương thức này
            .allowedHeaders("*") // Cho phép tất cả các header
            .allowCredentials(true); // Quan trọng nếu bạn sử dụng cookie hoặc session
    }
}