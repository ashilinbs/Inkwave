package com.inkwave.backend.repository;

import com.inkwave.backend.model.Blog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BlogRepository extends MongoRepository<Blog, String> {
    List<Blog> findByAuthorId(String authorId);
}
