package com.flogin.dto;

public class LoginResponse {
    private String message;
    private String token; 
    private UserDTO user; // ⭐️ Thêm đối tượng UserDTO

    public LoginResponse(String message, UserDTO user) {
        this.message = message;
        this.user = user;
        this.token = "DUMMY_TOKEN_FOR_" + user.getUsername(); // Giả lập Token
    }

    // Getters and Setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public UserDTO getUser() { return user; }
    public void setUser(UserDTO user) { this.user = user; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}