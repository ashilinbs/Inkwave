package com.inkwave.backend.controller;

import com.inkwave.backend.model.User;
import com.inkwave.backend.model.Blog;
import com.inkwave.backend.model.Comment;
import com.inkwave.backend.repository.UserRepository;
import com.inkwave.backend.repository.BlogRepository;
import com.inkwave.backend.repository.CommentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/dashboard")

public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private CommentRepository commentRepository;

    // Get system stats
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getDashboardStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalBlogs", blogRepository.count());
        stats.put("totalComments", commentRepository.count());
        return ResponseEntity.ok(stats);
    }

    // Get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Delete a user
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    
    @PutMapping("/users/{id}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable String id, @RequestParam String role) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        user.setRole(role);
        userRepository.save(user);
        return ResponseEntity.ok("User role updated to " + role);
    }
}
