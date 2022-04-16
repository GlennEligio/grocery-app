package com.accenture.web.apigateway.dtos;

import java.util.Objects;

public class UserDto {

    private String username;
    private String jwt;
    private String role;

    public UserDto() {
    }

    public UserDto(String username, String jwt, String role) {
        this.username = username;
        this.jwt = jwt;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
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
        return Objects.equals(username, userDto.username) && Objects.equals(jwt, userDto.jwt) && Objects.equals(role, userDto.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, jwt, role);
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "username='" + username + '\'' +
                ", token='" + jwt + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
