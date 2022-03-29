package com.accenture.web.util;

import com.accenture.web.domain.User;
import com.accenture.web.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;

public class DataLoader implements ApplicationRunner {

    private final UserRepository userRepository;

    public DataLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if(userRepository.findByRoles("SADMIN").isEmpty()){
            User user = new User("sadmin", "sadmin", "sadmin", "ROLE_SADMIN");
            userRepository.save(user);
        }
    }
}
