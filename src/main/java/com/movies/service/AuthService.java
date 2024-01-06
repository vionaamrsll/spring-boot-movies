package com.movies.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.movies.entity.Auth;
import com.movies.model.AuthRequest;
import com.movies.model.AuthResponse;
import com.movies.repository.AuthRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class AuthService {
        @Autowired
        private AuthRepository authRepository;

        private static final String SECRET_KEY = "ultrasupersecretkey867238sssasdasdwqeqweqeqweasd";
        private static final long EXPIRATION_TIME = 86400000; // 24 hours in milliseconds

        public AuthResponse auth(AuthRequest request) {
                Auth auth = authRepository.findByUsernameAndPassword(request.getUsername(), request.getPassword())
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                                                "wrong username or password"));

                Date now = new Date();
                Date expiration = new Date(now.getTime() + EXPIRATION_TIME);

                Map<String, Object> claims = new HashMap<>();
                claims.put("is_admin", auth.isAdmin());
                claims.put("username", auth.getUsername());

                String token = Jwts.builder()
                                .addClaims(claims)
                                .setIssuedAt(now)
                                .setExpiration(expiration)
                                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                                .compact();

                return AuthResponse.builder()
                                .token(token)
                                .build();
        }
}
