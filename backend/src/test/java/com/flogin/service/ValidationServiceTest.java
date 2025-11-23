package com.flogin.service;

//import com.flogin.service.ValidationService;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ValidationServiceTest {

    private final ValidationService validator = new ValidationService();

    // ===== Username =====
    @Test
    void testEmptyUsername() {
        assertFalse(validator.validateUsername("")); // username rỗng
    }
    
    @Test
    void testNULLUsername() {
        assertFalse(validator.validateUsername(null)); // username null
    }

    @Test
    void testShortUsername() {
        assertFalse(validator.validateUsername("ab")); // quá ngắn
    }

    @Test
    void testLongUsername() {
        assertFalse(validator.validateUsername("a".repeat(51))); // quá dài
    }

    @Test
    void testInvalidCharactersUsername() {
        assertFalse(validator.validateUsername("user!@#")); // ký tự đặc biệt
    }

    @Test
    void testValidUsername() {
        assertTrue(validator.validateUsername("user_123")); // hợp lệ
    }

    // ===== Password =====
    @Test
    void testEmptyPassword() {
        assertFalse(validator.validatePassword("")); // rỗng
    }
    
    @Test
    void testNULLPassword() {
        assertFalse(validator.validatePassword(null)); // null
    }

    @Test
    void testShortPassword() {
        assertFalse(validator.validatePassword("a1b")); // quá ngắn
    }
    @Test
    void testLongPassword() {
        assertFalse(validator.validatePassword("a".repeat(101))); // quá dài
    }

    @Test
    void testPasswordWithoutNumber() {
        assertFalse(validator.validatePassword("abcdef")); // không có số
    }

    @Test
    void testPasswordWithoutLetter() {
        assertFalse(validator.validatePassword("123456")); // không có chữ
    }

    @Test
    void testValidPassword() {
        assertTrue(validator.validatePassword("abc123")); // hợp lệ
    }
}
