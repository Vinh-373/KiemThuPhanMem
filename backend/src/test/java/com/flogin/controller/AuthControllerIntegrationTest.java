package com.flogin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flogin.App;
import com.flogin.dto.LoginRequest;
import com.flogin.dto.LoginResponse;
import com.flogin.dto.UserDto;
import com.flogin.repository.ProductRepository;
import com.flogin.repository.UserRepository;
import com.flogin.service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.containsString;

@ContextConfiguration(classes = App.class)
@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
@DisplayName("Login API Integration Tests")
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc; // Dùng để gửi request

    @Autowired
    private ObjectMapper objectMapper; // Dùng để chuyển đổi Java Object <> JSON

    // Mock lớp Service để cô lập Controller
    @MockBean 
    private AuthService authService; 

    @MockBean 
    private UserRepository userRepository; 
    
    @MockBean 
    private ProductRepository productRepository;

    // TC-LAPI-001: Đăng nhập thành công (Test POST /api/auth/login endpoint - 3 điểm)
    @Test
    @DisplayName("POST /api/auth/login - Đăng nhập thành công (Status 200)")
    void testLoginSuccess() throws Exception {
        // Arrange
        LoginRequest request = new LoginRequest("testuser", "Test123");
        LoginResponse mockResponse = new LoginResponse(
            true, "Đăng nhập thành công", "token123", new UserDto("testuser", "testuser@example.com")
        );

        // Giả lập AuthService trả về kết quả thành công
        when(authService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                
                // Test response structure và status codes (1 điểm)
                .andExpect(status().isOk()) 
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Đăng nhập thành công"))
                .andExpect(jsonPath("$.token").exists());
    }

    // TC-LAPI-002: Đăng nhập thất bại (Test POST /api/auth/login endpoint - 3 điểm)
    @Test
    @DisplayName("POST /api/auth/login - Sai credentials (Status 401 Unauthorized)")
    void testLoginFailure() throws Exception {
        // Arrange
        LoginRequest request = new LoginRequest("wronguser", "Wrong123");
        LoginResponse mockResponse = new LoginResponse(
            false, "Tên đăng nhập hoặc mật khẩu không đúng", null, null
        );
        
        // Giả lập AuthService trả về kết quả thất bại
        when(authService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                
                // Test response structure và status codes (1 điểm)
                .andExpect(status().isUnauthorized()) // Giả định Controller trả về 401
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Tên đăng nhập hoặc mật khẩu không đúng"))
                .andExpect(jsonPath("$.token").doesNotExist());
    }
    
    // TC-LAPI-003: Test CORS và Headers (1 điểm)
    @Test
    @DisplayName("Test CORS và Headers")
    void testCORSHeaders() throws Exception {
        // Arrange (Cho API thành công để kiểm tra headers)
        LoginRequest request = new LoginRequest("testuser", "Test123");
        LoginResponse mockResponse = new LoginResponse(true, "Thành công", "token123", null);
        when(authService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                // Giả lập request từ một Origin khác (CORS)
                .header("Origin", "http://localhost:3000")) 
                
                // c) Kiểm tra Header CORS
                .andExpect(header().exists("Access-Control-Allow-Origin")) 
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:3000")) // Tùy thuộc config thực tế
                .andExpect(header().string("Content-Type", containsString("application/json")));
    }
}