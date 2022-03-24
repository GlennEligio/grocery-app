package com.accenture.web.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import com.accenture.web.exception.AppException;
import com.accenture.web.service.ExcelFileService;
import org.apache.commons.compress.utils.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1")
public class UserController {

	private static final Logger log = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private ExcelFileService excelFileService;

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

	@GetMapping(value = "/users", params = {"page", "size"})
	public ResponseEntity<Page<User>> getUsersWithPaging(@RequestParam("page") int page,
														 @RequestParam("size") int size){
		log.info("Fetching users in page " + page + " with size " + size);
		return ResponseEntity.ok(service.getUsersWithPaging(PageRequest.of(page-1, size)));
	}

	@GetMapping(value = "/users", params = {"page", "size", "sort", "field"})
	public ResponseEntity<Page<User>> getUsersWithPagingAndSorting(@RequestParam("page") int page,
																   @RequestParam("size") int size,
																   @RequestParam("sort") String direction,
																   @RequestParam("field") String field){
		log.info("Fetching users in page " + page + " with size " + size + ", sorted by " + field + " in " + direction + " order");
		return ResponseEntity.ok(service.getUsersWithPagingAndSorting(PageRequest.of(page-1, size, Sort.Direction.fromString(direction), field)));
	}

	@GetMapping(value = "/users", params = {"id_query","page", "size", "sort", "field"})
	public ResponseEntity<Page<User>> getUserWithIdPagingAndSorting(@RequestParam("id_query") String idQuery,
																	@RequestParam("page") int page,
																	@RequestParam("size") int size,																	@RequestParam("sort") String direction,
																	@RequestParam("field") String field){
		log.info("Fetching users with id containing  " + idQuery + " in page " + page + " with size " + size + ", sorted by " + field + " in " + direction + " order");
		return ResponseEntity.ok(service.getUserWithIdPagingAndSorting(idQuery, PageRequest.of(page-1, size, Sort.Direction.fromString(direction), field)));
	}

	@GetMapping(value = "/users", params = {"name_query","page", "size", "sort", "field"})
	public ResponseEntity<Page<User>> getUserWithNamePagingAndSorting(@RequestParam("name_query") String nameQuery,
																	@RequestParam("page") int page,
																	  @RequestParam("size") int size,
																	@RequestParam("sort") String direction,
																	@RequestParam("field") String field){
		log.info("Fetching users with name containing  " + nameQuery + " in page " + page + " with size " + size + ", sorted by " + field + " in " + direction + " order");
		return ResponseEntity.ok(service.getUserWithNamePagingAndSorting(nameQuery, PageRequest.of(page-1, size, Sort.Direction.fromString(direction), field)));
	}

	@GetMapping(value = "/users", params = {"username_query","page", "size", "sort", "field"})
	public ResponseEntity<Page<User>> getUserWithUsernamePagingAndSorting(@RequestParam("username_query") String usernameQuery,
																	@RequestParam("page") int page,
																		  @RequestParam("size") int size,
																	@RequestParam("sort") String direction,
																	@RequestParam("field") String field){
		log.info("Fetching users with username containing " + usernameQuery + " in page " + page + " with size " + size + ", sorted by " + field + " in " + direction + " order");
		return ResponseEntity.ok(service.getUserWithUsernamePagingAndSorting(usernameQuery, PageRequest.of(page-1, size, Sort.Direction.fromString(direction), field)));
	}

	@PostMapping("/users/upload")
	public ResponseEntity<?> upload(@RequestParam("file")MultipartFile excelFile, @RequestParam("overwrite") Boolean overwrite){
		log.info("Preparing Excel for User Database update");
		if(!Objects.equals(excelFile.getContentType(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")){
			throw new AppException("Can only upload .xlsx files", HttpStatus.BAD_REQUEST);
		}
		List<User> users = excelFileService.excelFileToUserList(excelFile);
		int usersAffected = service.addOrUpdateUsers(users, overwrite);
		log.info("Users affected: {}", usersAffected);
		return ResponseEntity.ok().header("users-affected", String.valueOf(usersAffected)).build();

	}

	@GetMapping(value = "/users/download")
	public void download(HttpServletResponse response) throws IOException {
		log.info("Preparing User list for Download");
		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment; filename=users.xlsx");
		ByteArrayInputStream stream = excelFileService.userListToExcelFile(service.getAllUsers());
		IOUtils.copy(stream, response.getOutputStream());
	}

	@GetMapping(value = "/users/download/template")
	public void downloadTemplate(HttpServletResponse response) throws IOException {
		log.info("Preparing User Dummy list for Download");
		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment; filename=user-template.xlsx");
		// Create dummy data
		List<User> userDummy = new ArrayList<>();
		userDummy.add(new User(1, "Dummy name", "Dummy username", "Dummy password", true, "ROLE_USER"));
		userDummy.add(new User(2, "Dummy name2", "Dummy username2", "Dummy password2", false, "ROLE_ADMIN"));
		ByteArrayInputStream stream = excelFileService.userListToExcelFile(userDummy);
		IOUtils.copy(stream, response.getOutputStream());
		response.getOutputStream().flush();
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
