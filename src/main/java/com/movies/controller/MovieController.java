package com.movies.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.movies.model.MovieRequest;
import com.movies.model.WebResponse;
import com.movies.service.MovieService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class MovieController {
    @Autowired
    private MovieService movieService;

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

    // only admin
    @PostMapping(path = "/api/movies", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public WebResponse<String> newMovie(@RequestBody MovieRequest request, HttpServletRequest header) {
        Claims claim = validateToken(header);
        if (!(boolean) claim.get("is_admin")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "unauthorized action");
        }

        movieService.newMovie(request);
        return WebResponse.<String>builder().data("ok").build();
    }
}
