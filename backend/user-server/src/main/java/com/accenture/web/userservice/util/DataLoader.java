package com.accenture.web.userservice.util;

import com.accenture.web.userservice.domain.User;
import com.accenture.web.userservice.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if(userRepository.findByRoles("SADMIN").isEmpty()){
            User user = new User("sadmin", "sadmin", passwordEncoder.encode("sadmin"), "ROLE_SADMIN");
            userRepository.save(user);
        }
    }
}
