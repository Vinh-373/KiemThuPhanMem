package com.flogin.service;

import com.flogin.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Login Service Unit Tests")
class AuthServiceTest {

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService();
    }

    @Test
    @DisplayName("TC1: Login thanh cong voi username va password dung")
    void testLoginSuccess() {
        AuthService.LoginRequest request = new AuthService.LoginRequest("Minh", "123");
        AuthService.LoginResponse response = authService.authenticate(request);

        assertTrue(response.isSuccess());
        assertEquals("Dang nhap thanh cong", response.getMessage());
        assertNotNull(response.getToken());
    }

    @Test
    @DisplayName("TC2: Login that bai voi username khong ton tai")
    void testLoginInvalidUsername() {
        AuthService.LoginRequest request = new AuthService.LoginRequest("Duc", "123");
        AuthService.LoginResponse response = authService.authenticate(request);

        assertFalse(response.isSuccess());
        assertEquals("Username khong ton tai", response.getMessage());
        assertNull(response.getToken());
    }

    @Test
    @DisplayName("TC3: Login that bai voi password sai  ")
    void testLoginWrongPassword() {
        AuthService.LoginRequest request = new AuthService.LoginRequest("Minh", "111");
        AuthService.LoginResponse response = authService.authenticate(request);

        assertFalse(response.isSuccess());
        assertEquals("Sai mat khau", response.getMessage());
        assertNull(response.getToken());
    }

    @Test
    @DisplayName("TC4: Validation loi khi username hoac password rong hoac null")
    void testValidationErrors() {
        // Case 1: username rong
        AuthService.LoginRequest emptyUser = new AuthService.LoginRequest(null, "123");
        AuthService.LoginResponse res1 = authService.authenticate(emptyUser);
        assertFalse(res1.isSuccess());
        assertEquals("Username khong duoc de trong", res1.getMessage());

        // Case 2: password null
        AuthService.LoginRequest nullPass = new AuthService.LoginRequest("Minh", null);
        AuthService.LoginResponse res2 = authService.authenticate(nullPass);
        assertFalse(res2.isSuccess());
        assertEquals("Password khong duoc de trong", res2.getMessage());

        // Case 2: password rong
        AuthService.LoginRequest emptyPass = new AuthService.LoginRequest("Minh", "");
        AuthService.LoginResponse res3 = authService.authenticate(emptyPass);
        assertFalse(res3.isSuccess());
        assertEquals("Password khong duoc de trong", res3.getMessage());

        //Case 3: request null
        
        AuthService.LoginResponse res4 = authService.authenticate(null);
        assertFalse(res4.isSuccess());
        assertEquals("Request khong duoc null", res4.getMessage());
    }
}

