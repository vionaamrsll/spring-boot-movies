package com.movies.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.movies.entity.Movies;
import com.movies.model.MovieRequest;
import com.movies.model.WebResponse;
import com.movies.service.MovieService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    // all role
    @GetMapping(path = "/api/movies", produces = MediaType.APPLICATION_JSON_VALUE)
    public WebResponse<List<Movies>> getMethodName(HttpServletRequest header) {
        validateToken(header);

        List<Movies> data = movieService.getMovies();
        return WebResponse.<List<Movies>>builder().data(data).build();
    }

    // only admin
    @PutMapping(path = "/api/movies/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public WebResponse<String> updateMovie(@PathVariable String id, @RequestBody MovieRequest request,
            HttpServletRequest header) {
        Claims claim = validateToken(header);
        System.out.println((boolean) claim.get("is_admin"));
        if (!(boolean) claim.get("is_admin")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "unauthorized action");
        }

        movieService.updateMovie(id, request);
        return WebResponse.<String>builder().data("ok").build();
    }
}
