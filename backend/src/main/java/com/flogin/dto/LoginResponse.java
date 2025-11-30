package com.flogin.dto;

public class LoginResponse {
    private boolean success;
    private String message;
    private String token;
    private UserDto user;

    public LoginResponse(String message, UserDto user) {
        this.message = message;
        this.user = user;
        this.token = "DUMMY_TOKEN_FOR_" + user.getUsername(); // Giả lập Token
    }

    public LoginResponse(boolean success, String message, String token, UserDto user) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.user = user;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

}