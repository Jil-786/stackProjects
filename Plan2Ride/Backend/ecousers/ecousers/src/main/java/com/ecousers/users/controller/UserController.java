package com.ecousers.users.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecousers.users.service.UserService;

@RestController
@RequestMapping(value="/auth")
@CrossOrigin
public class UserController {

	private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PutMapping("/use-token")
    public Map<String, String> useToken(@RequestParam String email) {
        Map<String, String> response = new HashMap<>();
        boolean success = userService.useToken(email);

        if (success) {
            response.put("status", "success");
            response.put("message", "Token used successfully.");
        } else {
            response.put("status", "error");
            response.put("message", "No tokens left! Come Back Tomorrow.");
        }

        return response;
    }
}
