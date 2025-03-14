package com.bikeRide.bike.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bikeRide.bike.DTO.BikeDTO;
import com.bikeRide.bike.service.BikeService;



@RestController
//@CrossOrigin(origins="*")
public class BikeController {
	@Autowired
	private BikeService bikeService;
	
	@GetMapping(value="/model/{id}")
	 public Optional<BikeDTO> getBikeById(@PathVariable String id) {
		Optional<BikeDTO> op=bikeService.getBikeById(id);
		return op;
	}
	@GetMapping("/search")
	public List<BikeDTO> searchBikes(@RequestParam String prefix) {
	    
	    return bikeService.getBikesStartingWith(prefix);
	}

	
	@PostMapping(value="/add")
	public BikeDTO addBike(@RequestBody BikeDTO bikeDTO) {
	   BikeDTO b=bikeService.addBike(bikeDTO);
	   return b;
		}
	
	@PostMapping("/addAll")
	public String addBikes( @RequestBody List<BikeDTO> bikeDTOList) {
	   return bikeService.addBikes(bikeDTOList);
	    }
	
}
