package com.flogin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/mock")
@CrossOrigin(origins = "http://localhost:3000")
public class MockAuthController {

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> mockLogin(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Mock login successful");
        response.put("token", "MOCK_TOKEN_" + System.currentTimeMillis());
        response.put("user", Map.of(
            "username", request.get("username"),
            "role", "user"
        ));
        return ResponseEntity.ok(response);
    }
}