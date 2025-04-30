package com.inkwave.backend.repository;

import com.inkwave.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username); // Finds a user by username
    Optional<User> findByEmail(String email);       // Finds a user by email
}