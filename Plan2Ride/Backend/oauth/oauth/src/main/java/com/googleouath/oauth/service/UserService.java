package com.googleouath.oauth.service;

import com.googleouath.oauth.entity.User;
import com.googleouath.oauth.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getOrCreateUser(String oauthId, String name, String email, String picture) {
        Optional<User> existingUser = userRepository.findByOauthId(oauthId);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            resetTokensIfNewDay(user);
            return user;
        } else {
            User newUser = new User();
            newUser.setOauthId(oauthId);
            newUser.setName(name);
            newUser.setEmail(email);
            newUser.setPicture(picture);
            newUser.setPaid(false);
            newUser.setToken(2); // Default for free users
            newUser.setLastTokenUpdate(LocalDate.now());
            return userRepository.save(newUser);
        }
    }

    public void resetTokensIfNewDay(User user) {
        if (user.getLastTokenUpdate().equals(LocalDate.now())) {
          return;
        }
        if(user.isPaid()) {
           user.setToken(10);}
        else {
        	user.setToken(2);
        }
        user.setLastTokenUpdate(LocalDate.now());
        userRepository.save(user);
    }
}

