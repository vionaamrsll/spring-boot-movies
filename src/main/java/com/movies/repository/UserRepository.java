package com.movies.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.movies.entity.Users;

public interface UserRepository extends JpaRepository<Users, String> {

}
