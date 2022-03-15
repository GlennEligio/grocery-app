package com.accenture.web.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.accenture.web.dtos.AuthenticationResponse;
import com.accenture.web.domain.MyUserDetails;
import com.accenture.web.exception.AppException;
import com.accenture.web.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.accenture.web.domain.User;

@Service
@RefreshScope
public class UserServiceImpl implements UserService, UserDetailsService {

	@Value("${user-service.secretKey}")
	private String secretKey;

	@Autowired
	private UserRepository repository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);
	
	public List<User> getAllUsers(){
		log.info("Fetching users from repository");
		List<User> users = (List<User>) repository.findAll();
		return users.stream().filter((user) -> !user.getRoles().contains("ROLE_SADMIN")).collect(Collectors.toList());
	}
	
	public User getUser(Integer id) {
		log.info("Fetching a user with id: " + id);
		Optional<User> userOp = repository.findById(id);
		if(userOp.isPresent()){
			return userOp.get();
		}
		throw new AppException("User not found", HttpStatus.NOT_FOUND);
	}
	
	public User addUser(User user) {
		log.info("Adding user " + user);
		User userDb = repository.findByUsername(user.getUsername());
		if(userDb != null){
			throw new AppException("User with username already exist", HttpStatus.CONFLICT);
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setActive(true);
		return repository.save(user);
	}

	public boolean updateUser(User user) {
		log.info("Updating user in Service" + user);
		Optional<User> op = repository.findById(user.getId());
		
		if(op.isPresent()) {
			User oldUser = op.get();
			oldUser.setName(user.getName());
			oldUser.setUsername(user.getUsername());
			oldUser.setPassword(passwordEncoder.encode(user.getPassword()));
			oldUser.setActive(user.isActive());
			oldUser.setRoles(user.getRoles());
			repository.save(oldUser);
			return true;
		}
		throw new AppException("No User exist to update", HttpStatus.NOT_FOUND);
	}
	
	public boolean deleteUser(Integer id) {
		log.info("Deleting user with id: " + id);
		Optional<User> userOp = repository.findById(id);
		if(userOp.isPresent()) {
			repository.delete(userOp.get());
			return true;
		}
		throw new AppException("No User exist to delete", HttpStatus.NOT_FOUND);
	}

	@Override
	public UserDetails loadUserByUsername(String username){
		log.info("Looking for a User with username: {}", username);
		User user  = repository.findByUsername(username);
		if(user != null) {
			log.info("User found: " + user);
			return new MyUserDetails(user);
		}
		log.info("User not found..");
		throw new UsernameNotFoundException("No User found");
	}

	public AuthenticationResponse validateToken(String token){
		String username = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
		log.info("Username is {}", username);

		User user = repository.findByUsername(username);

		if(user != null){
			AuthenticationResponse response = new AuthenticationResponse(user.getUsername(), token, user.getRoles());
			return response;
		}

		throw new RuntimeException("Jwt validation failed, Username in claims not found");
	}
}
