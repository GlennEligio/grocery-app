package com.accenture.web.userservice.repository;

import static org.junit.jupiter.api.Assertions.*;

import com.accenture.web.userservice.domain.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository repository;

    @Autowired
    private TestEntityManager entityManager;

    @BeforeEach
    void setup(){
        // Define Entity and persist it
        User user = new User(0, "name0", "user0", "pass0", true, "ROLE_CLERK");
        entityManager.persist(user);
    }

    @Test
    @DisplayName("Find Existing User with Valid Username")
    public void findByUsername_withValidUsername_returnsUser(){
        // Arrange
        String username = "user0";

        // Act
        User user = repository.findByUsername(username);

        // Assert
        assertNotNull(user);
        assertEquals(user.getUsername(), username);
    }

    @Test
    @DisplayName("Find User with Invalid Username")
    public void findByUsername_withInvalidUsername_returnsNull(){
        // Arrange
        String username = "user3";

        // Act
        User user = repository.findByUsername(username);

        // Assert
        assertNull(user);
    }
}
