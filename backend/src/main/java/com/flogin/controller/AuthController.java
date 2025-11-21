package com.flogin.controller;

import com.flogin.dto.LoginRequest;
import com.flogin.dto.LoginResponse;
import com.flogin.dto.RegisterRequest;
import com.flogin.entity.User;
import com.flogin.entity.Product; // ⭐️ Cần import Product Entity
import com.flogin.repository.UserRepository;
import com.flogin.repository.ProductRepository; // ⭐️ Cần import Product Repository
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.List; // ⭐️ Cần import List

import com.flogin.dto.UserDTO; // ⭐️ Cần import UserDTO

@RestController
@RequestMapping("/api") // ⭐️ Thay đổi base path để Product API (/products) trông hợp lý hơn
public class AuthController { // Tên lớp nên được đổi thành ApiController hoặc giữ nguyên AuthController

    private final UserRepository userRepository;
    private final ProductRepository productRepository; // ⭐️ Khai báo ProductRepository
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // ⭐️ Cập nhật Constructor để thêm ProductRepository
    public AuthController(UserRepository userRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    // --- REGISTER & LOGIN (Vẫn giữ nguyên ở /api/auth/...) ---

    @PostMapping("/auth/register") // Cập nhật đường dẫn
    public ResponseEntity<Object> register(@RequestBody RegisterRequest request) {
        if(userRepository.findByUsername(request.getUsername()).isPresent()) {
            return new ResponseEntity<>(
                Collections.singletonMap("message", "Username đã tồn tại!"),
                HttpStatus.BAD_REQUEST // 400
            );
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("user");
        user.setStatus((byte)1);
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        userRepository.save(user);
        
        return new ResponseEntity<>(
            Collections.singletonMap("message", "Đăng ký thành công!"),
            HttpStatus.CREATED // 201
        );
    }

   @PostMapping("/auth/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElse(null);
        
        // ... (Xử lý lỗi Username/Password như cũ) ...

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new ResponseEntity<>(
                Collections.singletonMap("message", "Sai mật khẩu!"),
                HttpStatus.UNAUTHORIZED // 401
            );
        }

        // ⭐️ TẠO USER DTO (Không bao gồm mật khẩu)
        UserDTO userDTO = new UserDTO(user);

        // ⭐️ Tạo đối tượng LoginResponse chứa UserDTO
        LoginResponse response = new LoginResponse(
            "Đăng nhập thành công! Chào " + user.getUsername(),
            userDTO // Truyền UserDTO vào
        );
        
        return new ResponseEntity<>(response, HttpStatus.OK); // 200
    }
    // --- ⭐️ API LẤY TOÀN BỘ SẢN PHẨM ---
    @GetMapping("/products") // Đường dẫn: /api/products
    public ResponseEntity<List<Product>> getAllProducts() {
        // Sử dụng JpaRepository's findAll() để lấy toàn bộ sản phẩm
        List<Product> products = productRepository.findAll();
        
        // Trả về danh sách sản phẩm với HTTP Status 200 OK
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}