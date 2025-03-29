package com.googleouath.oauth.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.googleouath.oauth.entity.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByOauthId(String oauthId);

	Optional<User> findByEmail(String email); 
    
}