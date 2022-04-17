package com.accenture.web.userservice.controller;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.accenture.web.userservice.dtos.AuthenticationRequest;
import com.accenture.web.userservice.dtos.AuthenticationResponse;
import com.accenture.web.userservice.config.MyUserDetails;
import com.accenture.web.userservice.domain.User;
import com.accenture.web.userservice.exception.AppException;
import com.accenture.web.userservice.repository.UserRepository;
import com.accenture.web.userservice.service.ExcelFileService;
import com.accenture.web.userservice.service.UserServiceImpl;
import com.accenture.web.userservice.util.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.context.WebApplicationContext;

import java.util.Arrays;
import java.util.List;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ExcelFileService excelFileService;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private UserRepository repository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private UserServiceImpl service;

    @MockBean
    private AuthenticationManager authenticationManager;

    private User user, admin;
    private List<User> userList;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setup(){
        objectMapper = new ObjectMapper();
        user = new User(0, "name0", "user0", "pass0", true, "ROLE_CLERK");
        admin = new User(1, "name1", "admin1", "pass1", true, "ROLE_ADMIN");
    }

    @Test
    @DisplayName("Check MockMvc")
    public void shouldCreateMockMvc(){
        assertNotNull(mockMvc);
    }

    @Test
    @DisplayName("Get All Users using Valid Role")
    @WithMockUser(roles = {"ADMIN"})
    public void getAllUser_withValidUserAndExistingUsers_returnOk() throws Exception {
        // Arrange
        userList = Arrays.asList(new User(0, "name0", "user0", "pass0", true, "ROLE_CLERK")
                , new User(1, "name1", "user1", "pass1", true, "ROLE_CLERK"),
                new User(2, "name2", "user2", "pass2", true, "ROLE_CLERK"));
        when(service.getAllUsers()).thenReturn(userList);

        // Act
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DisplayName("Get All Users with Invalid User")
    @WithMockUser(roles = {"CLERK"})
    public void getAllUser_withInvalidUserAndExistingUsers_returnForbidden() throws Exception {
        // Arrange
        when(service.getAllUsers()).thenReturn(userList);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users"))
                .andExpect(MockMvcResultMatchers.status().isForbidden());
    }

        @Test
        @DisplayName("Register New User")
        @WithMockUser(roles = "CLERK")
        public void registerUser_withNewUser_returnOk() throws Exception{
            // Arrange
            User newUser = new User("name0", "user0", "pass0");
            ObjectNode node = objectMapper.valueToTree(newUser);
            node.put("roles", "ROLE_CLERK");
            when(service.addUser(objectMapper.readValue(node.toString(), User.class))).thenReturn(user);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newUser)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DisplayName("Register Existing User")
    @WithMockUser(roles = "CLERK")
    public void registerUser_withExistingUser_returnNotFound() throws Exception{
        // Arrange
        User newUser = new User("name3", "user3", "pass3", "ROLE_CLERK");
        when(service.addUser(newUser)).thenReturn(null);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newUser)))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    @DisplayName("Create Admin using user with ROLE_SADMIN privilege")
    @WithMockUser(roles = "SADMIN")
    public void createAdmin_withSAdminPrivilege_returnsCreated() throws Exception{
        // Arrange
        User newUser = new User("name1", "admin1", "pass1", "ROLE_ADMIN");
        when(service.addUser(newUser)).thenReturn(admin);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newUser)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(admin)));
    }

    @Test
    @DisplayName("Create Admin using user with no ROLE_SADMIN privilege")
    @WithMockUser(roles = "ADMIN")
    public void createAdmin_withNoSAdminPrivilege_returnsCreated() throws Exception{
        // Arrange
        User newUser = new User("name1", "admin1", "pass1", "ROLE_ADMIN");
        when(service.addUser(newUser)).thenReturn(admin);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newUser)))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    @DisplayName("Get Existing User")
    @WithMockUser(roles = "ADMIN")
    public void getUser_withExistingUser_returnUser() throws Exception {
        // Arrange
        Integer userId = 0;
        when(service.getUser(0)).thenReturn(user);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users/0"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(user)));
    }

    @Test
    @DisplayName("Get Non existing User")
    @WithMockUser(roles = "ADMIN")
    public void getUser_withNonExistingUser_returnNotFound() throws Exception {
        // Arrange
        Integer userId = 3;
        when(service.getUser(3)).thenReturn(null);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users/3"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    @DisplayName("Create New User")
    @WithMockUser(roles = "ADMIN")
    public void createUser_withNewUser_returnCreated() throws Exception {
        // Arrange
        User newUser = new User("name0", "user0", "pass0", "ROLE_CLERK");
        when(service.addUser(newUser)).thenReturn(user);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newUser)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(user)));
    }

    @Test
    @DisplayName("Create Existing User")
    @WithMockUser(roles = "ADMIN")
    public void createUser_withExistingUser_returnNotFound() throws Exception {
        // Arrange
        User existingUser = new User("name3", "user3", "pass3", "ROLE_CLERK");
        when(service.addUser(existingUser)).thenReturn(null);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(existingUser)))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    @DisplayName("Delete Existing User")
    @WithMockUser(roles = "ADMIN")
    public void deleteUser_withExistingUser_returnOk() throws Exception {
        // Arrange
        int userId = 0;
        when(service.deleteUser(0)).thenReturn(true);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/users/" + userId))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DisplayName("Delete Non existing User")
    @WithMockUser(roles = "ADMIN")
    public void deleteUser_withNonExistingUser_returnNotFound() throws Exception {
        // Arrange
        int userId = 3;
        when(service.deleteUser(3)).thenReturn(false);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/users/" + userId))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    @DisplayName("Update Existing User")
    @WithMockUser(roles = "ADMIN")
    public void updateUser_withExistingUser_returnOk() throws Exception {
        // Arrange
        when(service.updateUser(user)).thenReturn(true);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/users")
                .content(objectMapper.writeValueAsString(user))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DisplayName("Update Non-existing User")
    @WithMockUser(roles = "ADMIN")
    public void updateUser_withNonExistingUser_returnNotFound() throws Exception {
        // Arrange
        when(service.updateUser(user)).thenReturn(false);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/users")
                        .content(objectMapper.writeValueAsString(user))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    @DisplayName("Login with Valid User Credentials")
    @WithMockUser
    public void login_withValidUser_returnAuthenticationResponse() throws Exception {
        // Arrange
        String token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMCIsImV4cCI6IjE2NzI1MDIzOTkiLCJpYXQiOiIxNjQ1NDU2MDQ4In0.N3bMK3g9SNxcvfoa-4MOAjhGBA9eYzH4f1pKeEQV81k";
        String refreshToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMCIsImV4cCI6IjE2NzI1MDIzOTkiLCJpYXQiOiIxNjQ1NDU2MDQ4In0.N3bMK3g9SNxcvfoa-4MOAjhGBA9eYzH4f1pKeEQV81k";
        User validUser = new User("user0", "pass0");
        AuthenticationResponse response = new AuthenticationResponse("user0", token, "ROLE_CLERK", refreshToken);
        MyUserDetails userDetails = new MyUserDetails(user);
        ReflectionTestUtils.setField(service, "secretKey", "grocerybillapp");
        when(service.loadUserByUsername("user0")).thenReturn(userDetails);
        when(jwtUtil.generateToken(userDetails)).thenReturn(token);
        when(jwtUtil.generateRefreshToken(userDetails)).thenReturn(refreshToken);
        when(passwordEncoder.matches(validUser.getPassword(), userDetails.getPassword())).thenReturn(true);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validUser)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(response)));

    }

    @Test
    @DisplayName("Login with Non existing User Credentials")
    @WithMockUser
    public void login_withNonExistingUser_returnForbidden() throws Exception {
        // Arrange
        AuthenticationRequest nonExistingUser = new AuthenticationRequest("user3", "pass3");
        when(service.loadUserByUsername("user3")).thenReturn(null);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(nonExistingUser)))
                .andExpect(MockMvcResultMatchers.status().isForbidden());
    }

    @Test
    @DisplayName("Login with Valid User but incorrect password")
    @WithMockUser
    public void login_withValidUserButIncorrectPassword_returnForbidden() throws Exception {
        // Arrange
        AuthenticationRequest validUser = new AuthenticationRequest("user0", "pass1");
        MyUserDetails myUserDetails = new MyUserDetails(user);
        when(service.loadUserByUsername("user0")).thenReturn(myUserDetails);
        when(passwordEncoder.matches(validUser.getPassword(), myUserDetails.getPassword())).thenReturn(false);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validUser)))
                .andExpect(MockMvcResultMatchers.status().isForbidden());
    }

    @Test
    @DisplayName("Validate a Valid JWT")
    public void validateToken_withValidToken_returnOk() throws Exception{
        // Arrange
        String validJwt = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMCIsImV4cCI6IjIwMjItMDMtMTZUMDE6MjY6MTAuNDY2WiIsImlhdCI6IjE2Nzg5MzAwMjIifQ.cPdCjq8xI37rttfSVi-DShV3utl6U8g_bVowAhzJpIU";
        String validRefreshToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMCIsImV4cCI6IjIwMjItMDMtMTZUMDE6MjY6MTAuNDY2WiIsImlhdCI6IjE2Nzg5MzAwMjIifQ.cPdCjq8xI37rttfSVi-DShV3utl6U8g_bVowAhzJpIU";
        AuthenticationResponse resp = new AuthenticationResponse("user0", validJwt , "ROLE_CLERK", validRefreshToken);
        when(service.validateToken(validJwt)).thenReturn(resp);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/validateToken?token="+validJwt))
                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(resp)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DisplayName("Validate an invalid JWT")
    public void validateToken_withInvalidToken_returnNotFound() throws Exception{
        // Arrange
        String invalidJwt = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMCIsImV4cCI6IjIwMjItMDMtMTZUMDE6MjY6MTAuNDY2WiIsImlhdCI6IjE2Nzg5MzAwMjIifQ.cPdCjq8xI37rttfSVi-DShV3utl6U8g_bVowAhzJpIU";
        String invalidRefreshToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMCIsImV4cCI6IjIwMjItMDMtMTZUMDE6MjY6MTAuNDY2WiIsImlhdCI6IjE2Nzg5MzAwMjIifQ.cPdCjq8xI37rttfSVi-DShV3utl6U8g_bVowAhzJpIU";
        AuthenticationResponse resp = new AuthenticationResponse("user0", invalidJwt , "ROLE_CLERK", invalidRefreshToken);
        when(service.validateToken(invalidJwt)).thenThrow(new AppException("Jwt validation failed, Username in claims not found", HttpStatus.NOT_FOUND));

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/validateToken?token="+invalidJwt))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
