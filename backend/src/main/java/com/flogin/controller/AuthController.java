package com.flogin.controller;

import com.flogin.dto.LoginRequest;
import com.flogin.dto.LoginResponse;
import com.flogin.dto.RegisterRequest;
import com.flogin.entity.User;
import com.flogin.entity.Product;
import com.flogin.repository.UserRepository;
import com.flogin.service.AuthService;
import com.flogin.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;

import com.flogin.dto.UserDto;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") 
public class AuthController {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final AuthService authService; // ⭐️ Thêm AuthService

    public AuthController(UserRepository userRepository, ProductRepository productRepository,AuthService authService) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.authService = authService; // Inject AuthService
    }

    // --- REGISTER ---
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

    // --- LOGIN ---
    @PostMapping("/auth/login")
public ResponseEntity<Object> login(@RequestBody LoginRequest request) {
    User user = userRepository.findByUsername(request.getUsername()).orElse(null);

    if (user == null) {
        LoginResponse response = new LoginResponse(false, "Tài khoản không tồn tại!", null, null);
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        LoginResponse response = new LoginResponse(false, "Sai mật khẩu!", null, null);
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    UserDto userDTO = new UserDto(user);
    
    // ✅ SET success = true
    LoginResponse response = new LoginResponse(
        true,  // success = true
        "Đăng nhập thành công! Chào " + user.getUsername(),
        "DUMMY_TOKEN_FOR_" + user.getUsername(),
        userDTO
    );

    return new ResponseEntity<>(response, HttpStatus.OK);
}
    @PostMapping("/auth/login_integration")
    // ⭐️ Thay đổi kiểu trả về thành LoginResponse (DTO mới) thay vì Object để dễ
    // dàng thao tác với response
    public ResponseEntity<LoginResponse> login_integrationtest(@RequestBody LoginRequest request) {
        // ⭐️ Gọi AuthService để xử lý logic đăng nhập
        LoginResponse response = authService.authenticate(request);

        if (response.isSuccess()) {
            return new ResponseEntity<>(response, HttpStatus.OK); // 200
        } else {
            // Giả định AuthService trả về status failure
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED); // 401
        }
    }

    // // --- LẤY TOÀN BỘ SẢN PHẨM ---
    // @GetMapping("/products")
    // public ResponseEntity<List<Product>> getAllProducts() {
    //     List<Product> products = productRepository.findAll();
    //     return new ResponseEntity<>(products, HttpStatus.OK);
    // }
}
