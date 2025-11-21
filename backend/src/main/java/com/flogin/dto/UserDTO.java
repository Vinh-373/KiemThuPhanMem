package com.flogin.dto;

import com.flogin.entity.User;

public class UserDTO {
    private String username;
    private String role;
    // Có thể thêm ID hoặc các trường khác nếu cần

    public UserDTO(User user) {
        this.username = user.getUsername();
        this.role = user.getRole();
    }

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}