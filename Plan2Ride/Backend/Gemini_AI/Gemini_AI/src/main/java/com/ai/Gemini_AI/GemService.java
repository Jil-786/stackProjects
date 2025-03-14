package com.ai.Gemini_AI;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import org.springframework.web.reactive.function.client.WebClient;

@Service
public class GemService {
    
	@Value("${gemini.api.url}")
	private String api_url;
	
	@Value("${gemini.api.key}")
	private String api_key;
	
	private final WebClient webClient;
	
	public GemService(WebClient.Builder webClient) {
		this.webClient=webClient.build();
	}

	
	public String getAnswer(String question) {
	/*	{
			  "contents": [{
			    "parts":[{
			    "text": "what are u"}]
			    }]
			   }*/
		 
	   // request type in above format
		Map<String,Object> body=
				Map.of("contents", new Object[] {
				Map.of("parts", new Object[] {
				Map.of("text",question)})
				}
				);
		
	  // web client API call
		String response=webClient.post()
				 .uri(api_url+api_key)
				 .header("Content-Type", "application/json")
				 .bodyValue(body)
				 .retrieve()
				 .bodyToMono(String.class)
				 .block(); // converts reactive mono to actual string
		
		     // return response
		return response;
		}

}
