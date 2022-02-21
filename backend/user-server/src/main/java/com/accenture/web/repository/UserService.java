package com.accenture.web.repository;

import java.util.List;
import java.util.Optional;

import com.accenture.web.domain.AuthenticationResponse;
import com.accenture.web.domain.MyUserDetails;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.accenture.web.domain.User;

import javax.transaction.Transactional;

@Service
@RefreshScope
public class UserService implements UserDetailsService {

	@Value("${user-service.secretKey}")
	private String secretKey;

	@Autowired
	private UserRepository repository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	private static final Logger log = LoggerFactory.getLogger(UserService.class);
	
	public List<User> getAllUsers(){
		log.info("Fetching users from repository");
		return (List<User>) repository.findAll();
	}
	
	public User getUser(Integer id) {
		log.info("Fetching a user with id: " + id);
		return repository.findById(id).get();
	}
	
	public User addUser(User user) {
		log.info("Adding user " + user);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setActive(true);
		user.setRoles("ROLE_CLERK");
		return repository.save(user);
	}

	public boolean updateUser(User user) {
		log.info("Updating user " + user);
		Optional<User> op = repository.findById(user.getId());
		
		if(op != null) {
			User oldUser = op.get();
			oldUser.setName(user.getName());
			oldUser.setUsername(user.getUsername());
			oldUser.setPassword(passwordEncoder.encode(user.getPassword()));
			oldUser.setActive(user.isActive());
			oldUser.setRoles(user.getRoles());
			repository.save(oldUser);
			return true;
		}
		return false;
	}
	
	public boolean deleteUser(Integer id) {
		log.info("Deleting user with id: " + id);
		User user = repository.findById(id).get();
		if(user != null) {
			repository.delete(user);
			return true;
		}
		return false;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("Looking for a User with username: " + username);
		User user  = repository.findByUsername(username);
		if(user != null) {
			log.info("User found: " + user);
			return new MyUserDetails(user);
		}
		log.info("User not found..");
		throw new UsernameNotFoundException("User not found");
	}

	public AuthenticationResponse validateToken(String token) throws Exception {
		String username = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
		log.info("Username is {}", username);

		User user = repository.findByUsername(username);

		if(user != null){
			AuthenticationResponse response = new AuthenticationResponse(user.getUsername(), token, user.getRoles());
			return response;
		}

		throw new Exception("Jwt validation failed, Username in claims not found");
	}
}
