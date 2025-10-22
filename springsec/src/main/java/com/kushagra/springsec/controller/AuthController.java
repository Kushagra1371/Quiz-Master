package com.kushagra.springsec.controller;

import com.kushagra.springsec.model.Users;
import com.kushagra.springsec.service.UserService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody Users user) {
        userService.register(user);
        return "Registered";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users user) {
        String token = userService.verify(user);
        if ("fail".equals(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
        return ResponseEntity.ok(token);
    }
    
    
    
    @GetMapping("/profile")
    public ResponseEntity<?> profile(Authentication authentication) {
        if (authentication == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("not-authenticated");
        var principal = authentication.getPrincipal();
        // principal is UserDetails (UserPrincipal)
        String username = authentication.getName();
        String role = authentication.getAuthorities().stream().findFirst().map(Object::toString).orElse("USER");
        return ResponseEntity.ok(Map.of("username", username, "role", role));
    }
}
