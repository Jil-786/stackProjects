package com.ai.Gemini_AI;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="gemini")
@CrossOrigin
public class GemController {
	
	@Autowired
	private  GemService gemService;
     
	@PostMapping(value="/ask")
	 public ResponseEntity<String> askQuestion(@RequestBody Map<String,String> payload){
		 String question=payload.get("question");
		 String ans=gemService.getAnswer(question);
		 return  ResponseEntity.ok(ans);
		 
	 }
}
