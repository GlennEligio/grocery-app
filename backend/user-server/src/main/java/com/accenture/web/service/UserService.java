package com.accenture.web.service;

import com.accenture.web.dtos.AuthenticationResponse;
import com.accenture.web.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();
    Page<User> getUsersWithPagingAndSorting(Pageable pageable);
    Page<User> getUserWithIdPagingAndSorting(String id, Pageable pageable);
    Page<User> getUserWithNamePagingAndSorting(String name, Pageable pageable);
    Page<User> getUserWithUsernamePagingAndSorting(String username, Pageable pageable);
    int addOrUpdateUsers(List<User> users, boolean overwrite);
    User getUser(Integer id);
    User addUser(User user);
    boolean updateUser(User user);
    boolean deleteUser(Integer id);
    AuthenticationResponse validateToken (String token);

}
