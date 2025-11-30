package com.flogin.controller;

import com.flogin.dto.LoginRequest;
import com.flogin.dto.LoginResponse;
import com.flogin.dto.RegisterRequest;
import com.flogin.entity.User;
import com.flogin.repository.UserRepository;
import com.flogin.service.AuthService;
import com.flogin.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Collections;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final AuthService authService;

    public AuthController(UserRepository userRepository,
                          ProductRepository productRepository,
                          AuthService authService) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.authService = authService;
    }

    // --- REGISTER (giống cũ, không động tới) ---
    @PostMapping("/auth/register")
    public ResponseEntity<Object> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return new ResponseEntity<>(
                    Collections.singletonMap("message", "Username đã tồn tại!"),
                    HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("user");
        user.setStatus((byte) 1);
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        userRepository.save(user);

        return new ResponseEntity<>(
                Collections.singletonMap("message", "Đăng ký thành công!"),
                HttpStatus.CREATED);
    }

    // --- LOGIN: sửa để dùng AuthService.authenticate() ---
    @PostMapping("/auth/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest request) {

        // ⭐ Bắt buộc gọi authenticate — khớp với test Mockito
        LoginResponse response = authService.authenticate(request);

        if (response.isSuccess()) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    // --- LOGIN integration test (y giữ nguyên) ---
    @PostMapping("/auth/login_integration")
    public ResponseEntity<LoginResponse> login_integrationtest(@RequestBody LoginRequest request) {

        LoginResponse response = authService.authenticate(request);

        if (response.isSuccess()) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }
}
