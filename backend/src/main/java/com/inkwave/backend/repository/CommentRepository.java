package com.inkwave.backend.repository;

import com.inkwave.backend.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByBlogId(String blogId);
}
