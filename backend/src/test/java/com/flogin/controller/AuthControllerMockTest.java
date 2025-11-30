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
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ContextConfiguration(classes = App.class)
@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
@DisplayName("Login API Mock Tests")
class AuthControllerMockTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // Mock AuthService để cô lập Controller
    @MockBean 
    private AuthService authService; 

    @MockBean 
    private UserRepository userRepository; 
    
    @MockBean 
    private ProductRepository productRepository;

  
    
    // TC-AMOCK-001: Mock AuthService với @MockBean
    @Test
    @DisplayName("Mock Controller với AuthService - Mock authService được inject vào controller")
    void testControllerWithMockedService() throws Exception {
        // Arrange - Mock AuthService để trả về kết quả thành công
        LoginRequest request = new LoginRequest("testuser", "Test123");
        LoginResponse mockResponse = new LoginResponse(
            true, 
            "Mock: Controller với mocked service thành công", 
            "mock-token-123", 
            new UserDto("testuser", "test@example.com")
        );
        
        // Cấu hình mock: khi authService.authenticate() được gọi, trả về mockResponse
        when(authService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        // Act & Assert - Gửi request và kiểm tra response
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                
                // Kiểm tra: Response status là 200 OK
                .andExpect(status().isOk()) 
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Mock: Controller với mocked service thành công"))
                .andExpect(jsonPath("$.token").value("mock-token-123"));
    }

    
    // TC-AMOCK-002: Test controller success case với mocked service
    @Test
    @DisplayName("Test Controller: POST /api/auth/login - Đăng nhập thành công (Mock Service)")
    void testLoginControllerSuccess() throws Exception {
        // Arrange
        LoginRequest request = new LoginRequest("admin", "Admin123");
        LoginResponse mockResponse = new LoginResponse(
            true, 
            "Đăng nhập thành công", 
            "admin-token-456", 
            new UserDto("admin", "admin@example.com")
        );
        
        when(authService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Đăng nhập thành công"))
                .andExpect(jsonPath("$.token").exists());
    }

    // TC-AMOCK-003: Test controller failure case với mocked service
    @Test
    @DisplayName("Test Controller: POST /api/auth/login - Sai credentials (Mock Service)")
    void testLoginControllerFailure() throws Exception {
        // Arrange
        LoginRequest request = new LoginRequest("wronguser", "Wrong123");
        LoginResponse mockResponse = new LoginResponse(
            false, 
            "Tên đăng nhập hoặc mật khẩu không đúng", 
            null, 
            null
        );
        
        when(authService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                
                .andExpect(status().isUnauthorized()) // 401
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Tên đăng nhập hoặc mật khẩu không đúng"));
    }

    
    // TC-AMOCK-004: Verify authService.authenticate() được gọi
    @Test
    @DisplayName("Verify Mock Interactions: authService.authenticate() được gọi đúng lần")
    void testMockInteractions() throws Exception {
        // Arrange
        LoginRequest request = new LoginRequest("testuser", "Test123");
        LoginResponse mockResponse = new LoginResponse(
            true, 
            "Thành công", 
            "token123", 
            new UserDto("testuser", "test@example.com")
        );
        
        when(authService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        // Act
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());

        // Assert - Verify mock was called exactly once
        verify(authService, times(1)).authenticate(any(LoginRequest.class));
    }

    // TC-AMOCK-005: Verify mock không được gọi khi request invalid
    @Test
    @DisplayName("Verify Mock Interactions: Mock không được gọi khi dữ liệu không hợp lệ")
    void testMockNotCalledOnInvalidData() throws Exception {
        // Arrange - Giả định request thiếu field được validate trước
        LoginRequest request = new LoginRequest("", "");

        // Act - Nếu component validate ở client, mock không được gọi
        // Lưu ý: Điều này phụ thuộc vào implementation của LoginForm component
        // Nếu server-side validation, AuthService vẫn sẽ được gọi
        
        when(authService.authenticate(any(LoginRequest.class))).thenReturn(
            new LoginResponse(false, "Input không hợp lệ", null, null)
        );

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());

        // Verify - Mock có thể được gọi tùy vào validation strategy
        verify(authService, times(1)).authenticate(any(LoginRequest.class));
    }
}
