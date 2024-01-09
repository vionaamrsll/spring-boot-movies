package com.movies.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.movies.entity.Users;
import com.movies.model.UserRequest;
import com.movies.model.WebResponse;
import com.movies.service.UserService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    private static final String SECRET_KEY = "ultrasupersecretkey867238sssasdasdwqeqweqeqweasd";

    // check if token is valid or not and return the claims
    private Claims validateToken(HttpServletRequest request) {
        String requestKey = request.getHeader("Authorization");
        if (requestKey == null || requestKey.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "missing authorization header");
        }

        try {
            return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(requestKey).getBody();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "invalid or expired authorization token");
        }
    }

    // detail user base on token header
    @GetMapping(path = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public WebResponse<Users> getDetailUser(HttpServletRequest header) {
        Claims claim = validateToken(header);

        Users data = userService.getDetailUser((String) claim.get("username"));
        return WebResponse.<Users>builder().data(data).build();
    }

    @PutMapping(path = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public WebResponse<String> updateUsers(@RequestBody UserRequest request,
            HttpServletRequest header) {
        Claims claim = validateToken(header);

        request.setUsername((String) claim.get("username"));
        userService.updateDetailUser(request);
        return WebResponse.<String>builder().data("ok").build();
    }
}
