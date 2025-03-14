package com.bikeRide.bike.service;

import java.util.*;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bikeRide.bike.DTO.BikeDTO;
import com.bikeRide.bike.entity.BikeEntity;
import com.bikeRide.bike.repo.BikeRepo;

@Service
public class BikeService {

    @Autowired
    private BikeRepo bikeRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<BikeDTO> getAllBikes() {
        return bikeRepo.findAll().stream()
                .map(bike -> modelMapper.map(bike, BikeDTO.class))
                .collect(Collectors.toList());
    }

    public Optional<BikeDTO> getBikeById(String id) {
        return bikeRepo.findById(id)
                .map(bike -> modelMapper.map(bike, BikeDTO.class));
    }

    public BikeDTO addBike(BikeDTO bikeDTO) {
        BikeEntity bikeEntity = modelMapper.map(bikeDTO, BikeEntity.class);
        BikeEntity savedBike = bikeRepo.save(bikeEntity);
        return modelMapper.map(savedBike, BikeDTO.class);
    }
    public String addBikes(List<BikeDTO> bikeDTOList) {
        // Convert List of BikeDTOs to List of BikeEntities
        List<BikeEntity> bikeEntities = bikeDTOList.stream()
                .map(bikeDTO -> modelMapper.map(bikeDTO, BikeEntity.class))
                .collect(Collectors.toList());

        // Save all entities in the database
         bikeRepo.saveAll(bikeEntities);

        return "THE DATA ADDED";
    }
    public List<BikeDTO> getBikesStartingWith(String prefix) {
        List<BikeEntity> ls=bikeRepo.findBymodelNameStartingWith(prefix);
        List<BikeDTO> ar=new ArrayList<>();
        BikeDTO bd;
        for(BikeEntity b:ls) {
        	bd=modelMapper.map(b, BikeDTO.class);
        	ar.add(bd);
        }
        return ar;
    }


}

