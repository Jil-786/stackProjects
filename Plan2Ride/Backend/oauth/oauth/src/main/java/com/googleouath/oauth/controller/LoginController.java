package com.googleouath.oauth.controller;

import java.util.*;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.googleouath.oauth.entity.User;
import com.googleouath.oauth.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class LoginController {
	
 private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/userinfo")
    public Map<String, Object> getUserInfo(@AuthenticationPrincipal OAuth2User principal) {
        String oauthId = principal.getAttribute("sub");
        String email = principal.getAttribute("email");

        User user = userService.getOrCreateUser(
                oauthId,
                principal.getAttribute("name"),
                email,
                principal.getAttribute("picture")
        );

        Map<String, Object> userData = new HashMap<>();
        userData.put("name", user.getName());
        userData.put("email", user.getEmail());
        userData.put("picture", user.getPicture());
        userData.put("paid", user.isPaid());
        userData.put("token", user.getToken());

        return userData;
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            request.getSession().invalidate(); // Destroy session
            response.setStatus(HttpServletResponse.SC_OK);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}