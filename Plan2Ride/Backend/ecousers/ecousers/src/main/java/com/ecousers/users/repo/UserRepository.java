package com.ecousers.users.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ecousers.users.entity.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    

	Optional<User> findByEmail(String email); 
    
}