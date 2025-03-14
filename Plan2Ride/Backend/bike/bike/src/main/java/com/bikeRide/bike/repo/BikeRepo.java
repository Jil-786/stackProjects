package com.bikeRide.bike.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.bikeRide.bike.entity.BikeEntity;

public interface BikeRepo extends MongoRepository<BikeEntity, String>{
	List<BikeEntity> findBymodelNameStartingWith(String prefix);
}
