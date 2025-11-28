package com.flogin.dto;

import com.flogin.entity.User;

public class UserDto {
    private String username;
    private String role;
    private String password;
    // Có thể thêm ID hoặc các trường khác nếu cần

    public UserDto(User user) {
        this.username = user.getUsername();
        this.role = user.getRole();
    }

    public UserDto( String username , String password){
        this.username = username;
        this.password = password;
    }

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public void setPassword( String password) { this.password = password;}
    public String getPassword (){return password;}
}