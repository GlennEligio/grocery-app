package com.accenture.web.service;

import com.accenture.web.dtos.AuthenticationResponse;
import com.accenture.web.domain.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();
    User getUser(Integer id);
    User addUser(User user);
    boolean updateUser(User user);
    boolean deleteUser(Integer id);
    AuthenticationResponse validateToken (String token);

}
