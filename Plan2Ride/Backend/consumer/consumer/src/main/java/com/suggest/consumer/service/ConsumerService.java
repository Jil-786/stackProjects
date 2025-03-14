package com.suggest.consumer.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ConsumerService {
  
	@KafkaListener(topics="suggest-topic",groupId="suggest-group-1")
	public String getMsg(String msg) {
		System.out.println(msg);
		return msg;
	}
}
