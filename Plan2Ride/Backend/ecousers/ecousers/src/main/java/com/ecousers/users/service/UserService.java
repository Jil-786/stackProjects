package com.ecousers.users.service;

import java.util.Optional;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecousers.users.entity.User;
import com.ecousers.users.repo.UserRepository;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    //private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    public boolean useToken(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        // Validate user existence
        if (!userOpt.isPresent()) {
        //    logger.warn("User not found for email: {}", email);
            return false;
        }

        User user = userOpt.get();

        // Validate token count
        if (user.getToken() > 0) {
       //     logger.info("User {} has {} tokens before deduction.", email, user.getToken());
            user.setToken(user.getToken() - 1); // Deduct one token
            userRepository.save(user); // Save the updated user
         //   logger.info("Token deducted! User {} now has {} tokens.", email, user.getToken());
            return true;
        }

      //  logger.warn("No tokens left for user: {}", email);
        return false;
    }
}

