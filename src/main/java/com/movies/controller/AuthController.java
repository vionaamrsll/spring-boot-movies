package com.movies.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;

import com.movies.model.AuthRequest;
import com.movies.model.AuthResponse;
import com.movies.model.WebResponse;
import com.movies.service.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping(path = "/api/auth", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public WebResponse<AuthResponse> auth(@RequestBody AuthRequest request) {
        AuthResponse res = authService.auth(request);
        return WebResponse.<AuthResponse>builder().data(res).build();
    }

}
