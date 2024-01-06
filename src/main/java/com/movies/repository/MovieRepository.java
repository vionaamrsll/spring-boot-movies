package com.movies.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.movies.entity.Movies;

public interface MovieRepository extends JpaRepository<Movies, String> {
    
}
