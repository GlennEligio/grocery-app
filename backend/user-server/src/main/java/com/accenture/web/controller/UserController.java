package com.accenture.web.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import javax.ws.rs.HeaderParam;

import com.accenture.web.exception.AppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import com.accenture.web.dtos.AuthenticationRequest;
import com.accenture.web.dtos.AuthenticationResponse;
import com.accenture.web.domain.User;
import com.accenture.web.service.UserServiceImpl;
import com.accenture.web.util.JwtUtil;

@RestController
public class UserController {

	private static final Logger log = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserServiceImpl service;

	@Autowired
	private JwtUtil jwtUtil;

	@PostMapping(value = "/users/login")
	public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody AuthenticationRequest request) throws BadCredentialsException, UsernameNotFoundException{
		log.info("Authentication started with username: " + request.getUsername() + " and password: "
				+ request.getPassword());

		final UserDetails userDetails = service.loadUserByUsername(request.getUsername());
		if(userDetails == null){
			throw new UsernameNotFoundException("No user exist");
		}
		if(passwordEncoder.matches(request.getPassword(), userDetails.getPassword())){
			final String token = jwtUtil.generateToken(userDetails);
			log.info("Authentication success with jwt: " + token);
			return ResponseEntity.ok(new AuthenticationResponse(userDetails.getUsername(), token, userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","))));
		}
		throw new BadCredentialsException("Incorrect credentials");
	}

	@PostMapping("/users/validateToken")
	public ResponseEntity<AuthenticationResponse> validateToken(@RequestParam String token) throws Exception {
		log.info("Authenticating with token {}", token);
		return ResponseEntity.ok(service.validateToken(token));
	}

	@PostMapping("/users/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
		log.info("Registering user " + user);

		user.setRoles("ROLE_CLERK");

		User userDb = service.addUser(user);

		if (userDb != null) {
			log.info("Register success");
			return ResponseEntity.ok().build();
		}

		return ResponseEntity.notFound().build();
	}

	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers() {
		log.info("Fetching all users");
		
		List<User> users = service.getAllUsers();
		if (users != null) {
			users = users.stream().map((user) -> {
				User newUser = user;
				newUser.setPassword(null);
				return newUser;
			}).collect(Collectors.toList());
			log.info("Fetch success");
			return ResponseEntity.ok(service.getAllUsers());
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUser(@PathVariable("id") Integer id) {
		log.info("Fetching user with id: " + id);
		User user = service.getUser(id);
		if (user != null) {
			log.info("Fetch success");
			return ResponseEntity.ok(user);
		}
		return ResponseEntity.notFound().build();
	}

	@PostMapping("/users")
	public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
		log.info("Adding user: " + user);

		if(user.getRoles().contains("ROLE_ADMIN")
			&& !SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(new SimpleGrantedAuthority("ROLE_SADMIN"))){
			throw new AppException("Only Super Admin can create Admins", HttpStatus.UNAUTHORIZED);
		}

		User userDb = service.addUser(user);

		if (userDb != null) {
			log.info("User added");
			return new ResponseEntity<User>(userDb, HttpStatus.CREATED);
		}
		return ResponseEntity.notFound().build();
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable("id") Integer id) {
		log.info("Deleting user with id: " + id);
		boolean success = service.deleteUser(id);
		if (success) {
			log.info("Delete success");
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}

	@PutMapping("/users")
	public ResponseEntity<?> updateUser(@RequestBody User user) {
		log.info("Updating user " + user);
		boolean success = service.updateUser(user);
		if(success) return ResponseEntity.ok().build();
		else return ResponseEntity.notFound().build();
	}
}
