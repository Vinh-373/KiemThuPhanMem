package com.flogin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Lớp ứng dụng chính (Main Application Class) của Spring Boot.
 *
 * @SpringBootApplication: Chú thích tổng hợp, nó bao gồm:
 * 1. @SpringBootConfiguration: Đánh dấu lớp này là nguồn cấu hình chính cho Spring.
 * 2. @EnableAutoConfiguration: Kích hoạt cơ chế tự động cấu hình của Spring Boot,
 * giúp tự động cấu hình các bean (như DataSource, Web server) dựa trên các dependencies 
 * có trong file pom.xml.
 * 3. @ComponentScan: Kích hoạt quét các component (như @Controller, @Service, @Repository)
 * trong package hiện tại (com.flogin) và các package con của nó.
 */
@SpringBootApplication 
public class App 
{
    /**
     * Phương thức khởi chạy chính của ứng dụng Java.
     * @param args Các đối số dòng lệnh.
     */
    public static void main( String[] args )
    {
        // Khởi động ứng dụng Spring Boot.
        // SpringApplication.run() khởi tạo Spring context, thực hiện tự động cấu hình,
        // và khởi động Web Server (Tomcat nhúng).
        SpringApplication.run(App.class, args); 
    }
}