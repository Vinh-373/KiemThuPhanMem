package com.flogin.service;

public class ValidationService {

    public boolean validateUsername(String username) {
        if (username == null || username.trim().isEmpty()) return false;
        if (username.length() < 3 || username.length() > 50) return false;
        if (!username.matches("[a-zA-Z0-9\\-._]+")) return false;
        return true;
    }

    public boolean validatePassword(String password) {
        if (password == null || password.trim().isEmpty()) return false;
        if (password.length() < 6 || password.length() > 100) return false;
        if (!password.matches("^(?=.*[A-Za-z])(?=.*\\d).+$")) return false;
        return true;
    }
}
