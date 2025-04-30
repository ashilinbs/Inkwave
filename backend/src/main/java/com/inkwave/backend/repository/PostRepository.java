package com.inkwave.backend.repository;

import com.inkwave.backend.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post, String> {
    List<Post> findByAuthorId(String authorId); // Finds posts by the author's ID
    List<Post> findByPublished(boolean published); // Finds posts by their published status
}