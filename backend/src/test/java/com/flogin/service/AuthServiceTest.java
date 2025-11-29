package com.flogin.service;

import com.flogin.dto.LoginRequest;
import com.flogin.dto.LoginResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AuthServiceTest {

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthServiceImpl(); // khởi tạo service
    }

    @Test
    @DisplayName("TC1: Login thành công với username và password đúng")
    void testLoginSuccess() {
        LoginRequest request = new LoginRequest("Minh", "123");
        LoginResponse response = authService.authenticate(request);

        assertTrue(response.isSuccess());
        assertEquals("Đăng nhập thành công", response.getMessage());
        assertNotNull(response.getToken());
    }

    @Test
    @DisplayName("TC2: Login thất bại với username không tồn tại")
    void testLoginInvalidUsername() {
        LoginRequest request = new LoginRequest("Duc", "123");
        LoginResponse response = authService.authenticate(request);

        assertFalse(response.isSuccess());
        assertEquals("Username không tồn tại", response.getMessage());
        assertNull(response.getToken());
    }

    @Test
    @DisplayName("TC3: Login thất bại với password sai")
    void testLoginWrongPassword() {
        LoginRequest request = new LoginRequest("Minh", "111");
        LoginResponse response = authService.authenticate(request);

        assertFalse(response.isSuccess());
        assertEquals("Sai mật khẩu", response.getMessage());
        assertNull(response.getToken());
    }

    @Test
    @DisplayName("TC4: Validation lỗi")
    void testValidationErrors() {
        // Username null
        LoginRequest u1 = new LoginRequest(null, "123");
        assertEquals("Username không được để trống",
                authService.authenticate(u1).getMessage());

        // Password null
        LoginRequest u2 = new LoginRequest("Minh", null);
        assertEquals("Password không được để trống",
                authService.authenticate(u2).getMessage());

        // Password rỗng
        LoginRequest u3 = new LoginRequest("Minh", "");
        assertEquals("Password không được để trống",
                authService.authenticate(u3).getMessage());

        // Request null
        LoginResponse r4 = authService.authenticate(null);
        assertEquals("Request không được null", r4.getMessage());

        // Username rỗng
        LoginRequest u5 = new LoginRequest("", "123");
        assertEquals("Username không được để trống",
                authService.authenticate(u5).getMessage());
    }
}
