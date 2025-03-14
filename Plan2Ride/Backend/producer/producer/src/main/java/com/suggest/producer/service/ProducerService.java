package com.suggest.producer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProducerService {

	@Autowired
	private KafkaTemplate<String, Object> template;
	
	public void sendMsg(String message) {
		template.send("suggest-topic", message);
	}
}
