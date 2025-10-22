package com.kushagra.api_gateway.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Component
public class JWTUtil {

    private final String secret = "sh0w_n0_1_y0ur_secret_but_for_demo_use_this_many_chars_please_change_in_prod!";

    public JWTUtil() {}

    private SecretKey getKey() {
        // Directly use bytes instead of Base64 decoding
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }


    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claimsResolver.apply(claims);
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token) {
        try {
            extractUsername(token);
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }
}
