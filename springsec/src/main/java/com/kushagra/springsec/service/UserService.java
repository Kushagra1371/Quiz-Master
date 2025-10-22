package com.kushagra.springsec.service;






import com.kushagra.springsec.model.Users;
import com.kushagra.springsec.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private UserRepo repo;


    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Users register(Users user) {
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return user;
    }

    public String verify(Users user) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            // fetch persisted user to get role
            Users persisted = repo.findByUsername(user.getUsername());
            String role = (persisted != null && persisted.getRole() != null) ? persisted.getRole() : "USER";
            return jwtService.generateTokenWithRole(user.getUsername(), role);
        } else {
            return "fail";
        }
    }
}