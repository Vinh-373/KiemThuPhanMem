package com.flogin.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Cách dùng mới của Spring Security 6
            .authorizeHttpRequests(auth -> auth
                // ⭐️ Thêm /api/products vào danh sách công khai
                .requestMatchers("/api/auth/**", "/api/products").permitAll() 
                .anyRequest().authenticated()
            )
            .httpBasic(basic -> {}); // Tắt Basic Auth mặc định hoặc cấu hình lại
            
        return http.build();
    }
}