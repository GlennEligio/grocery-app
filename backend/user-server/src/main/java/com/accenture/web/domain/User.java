package com.accenture.web.domain;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotBlank(message = "Name must be defined")
	private String name;

	@Column(name = "user_username", unique = true)
	@NotBlank(message = "Username must be defined")
	private String username;

	@Column(name = "user_password")
	@NotBlank(message = "Password must be defined")
	private String password;

	private boolean active;

	private String roles;

	public User() {
		super();
	}

	public User(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}

	public User(@NotBlank(message = "Name must be defined") String name,
			@NotBlank(message = "Username must be defined") String username,
			@NotBlank(message = "Password must be defined") String password, boolean active, String roles) {
		super();
		this.name = name;
		this.username = username;
		this.password = password;
		this.active = active;
		this.roles = roles;
	}

	public User(int id, String name, String username, String password, boolean active, String roles) {
		this.id = id;
		this.name = name;
		this.username = username;
		this.password = password;
		this.active = active;
		this.roles = roles;
	}

	public User(String name, String username, String password, String roles) {
		this.name = name;
		this.username = username;
		this.password = password;
		this.roles = roles;
	}

	public User(int id, String name, String username, String password) {
		this.id = id;
		this.name = name;
		this.username = username;
		this.password = password;
	}

	public User(String name, String username, String password) {
		this.name = name;
		this.username = username;
		this.password = password;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	@Override
	public int hashCode() {
		return Objects.hash(active, id, name, password, roles, username);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		return active == other.active && id == other.id && Objects.equals(name, other.name)
				&& Objects.equals(password, other.password) && Objects.equals(roles, other.roles)
				&& Objects.equals(username, other.username);
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", username=" + username + ", password=" + password + ", active="
				+ active + ", roles=" + roles + "]";
	}

}
