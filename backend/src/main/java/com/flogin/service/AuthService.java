package com.flogin.service;

public class AuthService {

    public LoginResponse authenticate(LoginRequest request) {
        if (request == null) {
            return new LoginResponse(false, "Request khong duoc null", null);
        }

        if (request.getUsername() == null || request.getUsername().isEmpty()) {
            return new LoginResponse(false, "Username khong duoc de trong", null);
        }

        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            return new LoginResponse(false, "Password khong duoc de trong", null);
        }

        if (request.getUsername().equals("Minh") && request.getPassword().equals("123")) {
            return new LoginResponse(true, "Dang nhap thanh cong", "token123");
        } else if (!request.getUsername().equals("Minh")) {
            return new LoginResponse(false, "Username khong ton tai", null);
        } else {
            return new LoginResponse(false, "Sai mat khau", null);
        }
    }

    public static class LoginRequest {
        private String username;
        private String password;

        public LoginRequest(String username, String password) {
            this.username = username;
            this.password = password;
        }

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class LoginResponse {
        private boolean success;
        private String message;
        private String token;

        public LoginResponse(boolean success, String message, String token) {
            this.success = success;
            this.message = message;
            this.token = token;
        }

        public boolean isSuccess() {
            return success;
        }

        public String getMessage() {
            return message;
        }

        public String getToken() {
            return token;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }
}
