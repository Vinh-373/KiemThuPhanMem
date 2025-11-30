package com.flogin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flogin.dto.LoginRequest;
import com.flogin.dto.LoginResponse;
import com.flogin.dto.UserDto;
import com.flogin.service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
@DisplayName("Login API Mock Tests")
class AuthControllerMockTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // Mock Service
    @MockBean
    private AuthService authService;


    @Test
    @DisplayName("Mock Controller với AuthService - Mock được inject vào controller")
    void testControllerWithMockedService() throws Exception {
        LoginRequest request = new LoginRequest("testuser", "Test123");
        LoginResponse mockResponse = new LoginResponse(
                true,
                "Mock: Controller với mocked service thành công",
                "mock-token-123",
                new UserDto("testuser", "test@example.com")
        );

        when(authService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Mock: Controller với mocked service thành công"))
                .andExpect(jsonPath("$.token").value("mock-token-123"));
    }

    
    @Test
    @DisplayName("Test Controller: Đăng nhập thành công (200)")
    void testLoginControllerSuccess() throws Exception {
        LoginRequest request = new LoginRequest("admin", "Admin123");
        LoginResponse mockResponse = new LoginResponse(
                true,
                "Đăng nhập thành công",
                "admin-token-456",
                new UserDto("admin", "admin@example.com")
        );

        when(authService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Đăng nhập thành công"))
                .andExpect(jsonPath("$.token").exists());
    }


    @Test
    @DisplayName("Test Controller: Sai credentials → 401 Unauthorized")
    void testLoginControllerFailure() throws Exception {
        LoginRequest request = new LoginRequest("wronguser", "Wrong123");
        LoginResponse mockResponse = new LoginResponse(
                false,
                "Tên đăng nhập hoặc mật khẩu không đúng",
                null,
                null
        );

        when(authService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Tên đăng nhập hoặc mật khẩu không đúng"));
    }

    
    @Test
    @DisplayName("Verify authService.authenticate() được gọi đúng 1 lần")
    void testMockInteractions() throws Exception {
        LoginRequest request = new LoginRequest("testuser", "Test123");
        LoginResponse mockResponse = new LoginResponse(
                true,
                "Thành công",
                "token123",
                new UserDto("testuser", "test@example.com")
        );

        when(authService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());

        verify(authService, times(1)).authenticate(any(LoginRequest.class));
    }


    @Test
    @DisplayName("Request invalid → Không gọi authService.authenticate()")
    void testMockNotCalledOnInvalidData() throws Exception {
        LoginRequest request = new LoginRequest("", "");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(authService, times(0)).authenticate(any(LoginRequest.class));
    }
}
