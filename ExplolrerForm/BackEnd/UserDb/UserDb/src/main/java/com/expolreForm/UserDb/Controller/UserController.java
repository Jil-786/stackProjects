package com.expolreForm.UserDb.Controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
//import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expolreForm.UserDb.DTO.UserDTO;
import com.expolreForm.UserDb.Service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        return new ResponseEntity<>(userService.saveUser(userDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/check-email/{email}")
    public ResponseEntity<Boolean> checkEmailExists(@PathVariable String email) {
        return new ResponseEntity<>(userService.checkEmailExists(email), HttpStatus.OK);
    }
    @GetMapping("/get-password/{email}")
    public ResponseEntity<String> getPassword(@PathVariable String email) {
        return new ResponseEntity<>(userService.getPassword(email), HttpStatus.OK);
    }
//    @GetMapping("/login/oauth2/code/google")
//    public String getLoginInfo(OAuth2AuthenticationToken authentication) {
//        OAuth2User user = authentication.getPrincipal();
//        String email = user.getAttribute("email");
//        String name = user.getAttribute("name");
//        userService.processOAuthPostLogin(email, name);
//        return "redirect:/main?email=" + email;
//    }
    
    @GetMapping("/jsony")
    public Principal user(Principal p) {
    	return  p;
    }
}

