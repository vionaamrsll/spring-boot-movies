package com.movies.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.movies.entity.Auth;

public interface AuthRepository extends JpaRepository<Auth, String> {
    Optional<Auth> findByUsernameAndPassword(String username, String password);
}
