package com.accenture.web.service;

import static org.junit.jupiter.api.Assertions.*;

import com.accenture.web.dtos.AuthenticationResponse;
import com.accenture.web.config.MyUserDetails;
import com.accenture.web.domain.User;
import com.accenture.web.exception.AppException;
import com.accenture.web.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
@TestPropertySource(properties = { "user-service.jwt=grocerybillapp" })
public class UserServiceTest {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @MockBean
    private UserRepository userRepository;

    @BeforeEach
    void setup(){
        List<User> users = new ArrayList<User>();
        users.add(new User(0, "name0", "user0", "pass0", true, "ROLE_CLERK"));
        users.add(new User(1, "name1", "user1", "pass1", true, "ROLE_ADMIN"));
        users.add(new User(2, "name2", "user2", "pass2", true, "ROLE_SADMIN"));

        User user = new User(0, "name0", "user0", "pass0", true, "ROLE_CLERK");

        Optional<User> userOp = Optional.of(user);
        Optional<User> userOpNull = Optional.empty();

        Mockito.when(userRepository.findByUsername("user0")).thenReturn(user);
        Mockito.when(userRepository.findByUsername("user3")).thenReturn(null);

        Mockito.when(userRepository.findAll()).thenReturn(users);

        Mockito.when(userRepository.findById(0)).thenReturn(userOp);
        Mockito.when(userRepository.findById(3)).thenReturn(userOpNull);

    }

    @Test
    @DisplayName("Get Existing User with Valid ID")
    public void getUser_withExistingUser_returnUser(){
        // Arrange
        Integer id = 0;

        // Act
        User user = userServiceImpl.getUser(0);

        // Assert
        assertEquals(id, user.getId());
    }

    @Test
    @DisplayName("Get Unexisting User with Invalid ID")
    public void getUser_withExistingUser_returnNull(){
        // Arrange
        Integer id = 3;

        // Assert
        assertThrows(AppException.class, () -> userServiceImpl.getUser(id));
    }

    @Test
    @DisplayName("Get All User")
    public void getUsers_withExistingUsers_returnUsers(){
        // Arrange
        Integer userCount = 3;

        // Act
        List<User> users = userServiceImpl.getAllUsers();

        // Assert
        assertEquals(2, users.size());
        assertEquals(0, users.stream().filter((user -> user.getRoles().contains("ROLE_SADMIN"))).count());
    }

    @Test
    @DisplayName("Add New User and return new User")
    public void addUser_withNewUser_returnUser(){
        // Arrange
        User userToAdd = new User("name3", "user3", "pass3");
        User userSaved = new User("name3", "user3", passwordEncoder.encode("pass3"), true, "ROLE_CLERK");
        Mockito.when(userRepository.save(userToAdd)).thenReturn(userSaved);

        // Act
        User newUser = userServiceImpl.addUser(userToAdd);

        // Assert
        assertNotNull(newUser);
        assertInstanceOf(Integer.class, newUser.getId());
        assertEquals(userToAdd.getUsername(), newUser.getUsername());
        assertTrue(passwordEncoder.matches("pass3", newUser.getPassword()));
        assertEquals(userToAdd.getName(), newUser.getName());
        assertTrue(newUser.isActive());
        assertEquals(newUser.getRoles(), "ROLE_CLERK");
    }

    @Test
    @DisplayName("Update Existing User and return True")
    public void updateUser_withExistingUser_returnTrue(){
        // Arrange
        User userToUpdate = new User("name0", "user0", "pass0", false, "ROLE_ADMIN");
        User userSaved = new User("name0", "user0", passwordEncoder.encode("pass0"), false, "ROLE_ADMIN");
        Mockito.when(userRepository.save(userToUpdate)).thenReturn(userSaved);

        // Act
        Boolean result = userServiceImpl.updateUser(userToUpdate);

        // Assert
        assertTrue(result);
    }

    @Test
    @DisplayName("Update Non-existing User and return False")
    public void updateUser_withNonExistingUser_returnFalse(){
        // Arrange
        User userToUpdate = new User(3 ,"name0", "user0", "pass0", false, "ROLE_ADMIN");

        // Assert
        assertThrows(AppException.class, () -> userServiceImpl.updateUser(userToUpdate));
    }

    @Test
    @DisplayName("Delete Existing User")
    public void deleteUser_withExistingUser_returnTrue(){
        // Arrange
        Integer userIdToDelete = 0;

        // Act
        Boolean result = userServiceImpl.deleteUser(userIdToDelete);

        // Assert
        assertTrue(result);
    }

    @Test
    @DisplayName("Delete Non-existing User")
    public void deleteUser_withNonExistingUser_returnFalse(){
        // Arrange
        Integer userIdToDelete = 3;

        // Assert
        assertThrows(AppException.class, () -> userServiceImpl.deleteUser(userIdToDelete));
    }

    @Test
    @DisplayName("Get UserDetails from Valid Username input")
    public void loadUserByUsername_withValidUsername_returnUserDetails(){
        // Arrange
        String username = "user0";

        // Act
        MyUserDetails userDetails = (MyUserDetails) userServiceImpl.loadUserByUsername(username);

        // Assert
        assertNotNull(userDetails);
        assertEquals(userDetails.getUsername(), username);
        assertNotNull(userDetails.getAuthorities());
        assertInstanceOf(GrantedAuthority.class, userDetails.getAuthorities().toArray()[0]);
    }

    @Test
    @DisplayName("Get UserDetails from Invalid Username input")
    public void loadUserByUsername_withInvalidUsername_throwsUsernameNotFoundException(){
        // Arrange
        String username = "user3";

        // Assert
        assertThrows(UsernameNotFoundException.class, () -> userServiceImpl.loadUserByUsername(username));
    }

    @Test
    @DisplayName("Validate Valid JWT")
    public void validateToken_withValidToken_returnAuthenticationResponse(){
        // Arrange
        String token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMCIsImV4cCI6IjE2NzI1MDIzOTkiLCJpYXQiOiIxNjQ1NDU2MDQ4In0.N3bMK3g9SNxcvfoa-4MOAjhGBA9eYzH4f1pKeEQV81k";
        ReflectionTestUtils.setField(userServiceImpl, "secretKey", "grocerybillapp");

        // Act
        AuthenticationResponse response = userServiceImpl.validateToken(token);

        // Assert
        assertNotNull(response);
        assertEquals(response.getUsername(), "user0");
        assertEquals(response.getJwt(), token);
        assertEquals(response.getRole(), "ROLE_CLERK");
    }

    @Test
    @DisplayName("Validate Invalid JWT")
    public void validateToken_withInvalidToken_throwUsernameNotFoundException(){
        // Arrange
        String token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMyIsImV4cCI6IjE2NzI1MDIzOTkiLCJpYXQiOiIxNjQ1NDU2MDQ4In0.zxuheiH_sqHYVXZzttAs5DAi43XbmrPhiFAl6NvbMyo";
        ReflectionTestUtils.setField(userServiceImpl, "secretKey", "grocerybillapp");

        // Assert
        assertThrows(RuntimeException.class, () -> userServiceImpl.validateToken(token));

    }
}
