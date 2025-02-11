package com.expolreForm.UserDb.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expolreForm.UserDb.DTO.UserDTO;
import com.expolreForm.UserDb.Repository.UserRepository;
import com.expolreForm.UserDb.entity.User;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;



@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    public UserDTO saveUser(UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        user = userRepository.save(user);
        return modelMapper.map(user, UserDTO.class);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    public boolean checkEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }
    public String getPassword(String email) {
    	return userRepository.findPasswordByEmail(email);
    }
    public void processOAuthPostLogin(String email, String name) {
        User existUser = userRepository.findByEmail(email);

        if (existUser == null) {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name);
            userRepository.save(newUser);
        }
    }
//    public GoogleIdToken.Payload verifyGoogleToken(String idToken) throws Exception {
//        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
//            new NetHttpTransport(),
//            // Explicitly create a new instance to avoid conflicts
//            new JacksonFactory() 
//        )
//        .setAudience(Collections.singletonList("491121178053-f3pvnv2hf6cdnvkr5uo6aph61rdl3jfl.apps.googleusercontent.com"))
//        .build();
//
//        GoogleIdToken googleIdToken = verifier.verify(idToken);
//        if (googleIdToken != null) {
//            return googleIdToken.getPayload();
//        }
//        throw new RuntimeException("Invalid ID token");
//    }


}
