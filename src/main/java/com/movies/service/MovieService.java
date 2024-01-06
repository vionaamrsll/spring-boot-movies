package com.movies.service;

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

}