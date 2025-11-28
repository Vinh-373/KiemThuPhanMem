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
    // @PostMapping("/auth/login")
    // public ResponseEntity<Object> login(@RequestBody LoginRequest request) {
    // // Lấy user theo username
    // User user =
    // userRepository.findByUsername(request.getUsername()).orElse(null);

    // // Nếu user null => username không tồn tại
    // if (user == null) {
    // return new ResponseEntity<>(
    // Collections.singletonMap("message", "Sai mật khẩu!"),
    // HttpStatus.UNAUTHORIZED // 401
    // );
    // }

    // // Kiểm tra mật khẩu
    // if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
    // return new ResponseEntity<>(
    // Collections.singletonMap("message", "Sai mật khẩu!"),
    // HttpStatus.UNAUTHORIZED // 401
    // );
    // }

    // // Tạo UserDto (không bao gồm mật khẩu)
    // UserDto userDTO = new UserDto(user);

    // // Tạo LoginResponse
    // LoginResponse response = new LoginResponse(
    // "Đăng nhập thành công! Chào " + user.getUsername(),
    // userDTO
    // );

    // return new ResponseEntity<>(response, HttpStatus.OK); // 200
    // }
    @PostMapping("/auth/login")
    // ⭐️ Thay đổi kiểu trả về thành LoginResponse (DTO mới) thay vì Object để dễ
    // dàng thao tác với response
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
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
