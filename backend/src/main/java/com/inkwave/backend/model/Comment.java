package com.inkwave.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "comments")
public class Comment {

    @Id
    private String id;

    private String blogId;
    private String userId;
    private String content;
    private String createdAt;

    // Constructors
    public Comment() {}

    public Comment(String blogId, String userId, String content, String createdAt) {
        this.blogId = blogId;
        this.userId = userId;
        this.content = content;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public String getId() { return id; }

    public void setId(String id) { this.id = id; }

    public String getBlogId() { return blogId; }

    public void setBlogId(String blogId) { this.blogId = blogId; }

    public String getUserId() { return userId; }

    public void setUserId(String userId) { this.userId = userId; }

    public String getContent() { return content; }

    public void setContent(String content) { this.content = content; }

    public String getCreatedAt() { return createdAt; }

    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
