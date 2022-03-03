package com.accenture.web.dtos;

import java.util.Objects;

public class AuthenticationResponse {

	private String user;
	private String jwt;
	private String role;

	public AuthenticationResponse(String user, String jwt, String role) {
		this.user = user;
		this.jwt = jwt;
		this.role = role;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
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
		AuthenticationResponse that = (AuthenticationResponse) o;
		return Objects.equals(user, that.user) && Objects.equals(jwt, that.jwt) && Objects.equals(role, that.role);
	}

	@Override
	public int hashCode() {
		return Objects.hash(user, jwt, role);
	}

	@Override
	public String toString() {
		return "AuthenticationResponse{" +
				"user='" + user + '\'' +
				", jwt='" + jwt + '\'' +
				", role='" + role + '\'' +
				'}';
	}
}
