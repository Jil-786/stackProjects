package com.suggest.producer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.suggest.producer.service.ProducerService;

@RestController
@CrossOrigin
public class ProducerController {
	
	@Autowired
	private ProducerService producerService;
 
	@GetMapping(value="/suggest/{msg}")
	public String publishMessage( @PathVariable String msg) {
		String pmsg="Thank u for your Suggestion";
		try {
			producerService.sendMsg(msg);
		}
		catch(Exception e) {
			pmsg="An Error occureed we check into it";
		}
		return pmsg;
	}
}
