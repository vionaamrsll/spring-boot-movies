package com.movies.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movies.entity.Movies;
import com.movies.model.MovieRequest;
import com.movies.repository.MovieRepository;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    public void newMovie(MovieRequest request) {
        Movies movies = new Movies();
        movies.setDescription(request.getDescription());
        movies.setRating(request.getRating());
        movies.setTitle(request.getTitle());
        movies.setSchedule(request.getSchedule());

        movieRepository.save(movies);
    }

    public List<Movies> getMovies() {
        List<Movies> movies = movieRepository.findAll();

        return movies;
    }

    public void updateMovie(String id, MovieRequest request) {
        Movies movies = new Movies();
        movies.setDescription(request.getDescription());
        movies.setRating(request.getRating());
        movies.setTitle(request.getTitle());
        movies.setSchedule(request.getSchedule());
        movies.setId(id);

        movieRepository.save(movies);
    }

}