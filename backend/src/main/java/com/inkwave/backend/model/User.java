package com.inkwave.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Document(collection = "users")
@Validated
public class User {
    @Id
    private String id;

    @NotBlank(message = "Username is required") // Ensures the field is not blank
    @Indexed(unique = true) // Ensures the username is unique in the database
    private String username; // Unique username

    @NotBlank(message = "Password is required") // Ensures the field is not blank
    private String password; // Encrypted password

    @NotBlank(message = "Email is required") // Ensures the field is not blank
    @Email(message = "Invalid email format") // Validates email format
    @Indexed(unique = true) // Ensures the email is unique in the database
    private String email; // Unique email

    @NotBlank(message = "Full name is required") // Ensures the field is not blank
    private String fullName; // Full name of the user

    private String role = "USER"; // Default role of the user (e.g., "USER" or "ADMIN")

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}