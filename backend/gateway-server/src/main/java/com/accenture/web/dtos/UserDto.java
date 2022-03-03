package com.accenture.web.dtos;

import com.fasterxml.jackson.annotation.JsonAlias;

import java.util.Objects;

public class UserDto {

    @JsonAlias({"username", "user"})
    private String username;
    @JsonAlias({"token", "jwt"})
    private String token;
    private String role;

    public UserDto() {
    }

    public UserDto(String username, String token, String role) {
        this.username = username;
        this.token = token;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDto userDto = (UserDto) o;
        return Objects.equals(username, userDto.username) && Objects.equals(token, userDto.token) && Objects.equals(role, userDto.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, token, role);
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "username='" + username + '\'' +
                ", token='" + token + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
