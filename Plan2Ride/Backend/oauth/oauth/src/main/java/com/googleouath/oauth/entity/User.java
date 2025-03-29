package com.googleouath.oauth.entity;


import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "users")
public class User {
    
    @Id
    private String id; 

    private String oauthId; 
    private String name;
    private String email;
    private String picture;
    private boolean paid;
    private int token;
    private LocalDate lastTokenUpdate;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getOauthId() {
		return oauthId;
	}
	public void setOauthId(String oauthId) {
		this.oauthId = oauthId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public boolean isPaid() {
		return paid;
	}
	public void setPaid(boolean paid) {
		this.paid = paid;
	}
	public int getToken() {
		return token;
	}
	public void setToken(int token) {
		this.token = token;
	}
	public LocalDate getLastTokenUpdate() {
		return lastTokenUpdate;
	}
	public void setLastTokenUpdate(LocalDate lastTokenUpdate) {
		this.lastTokenUpdate = lastTokenUpdate;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", oauthId=" + oauthId + ", name=" + name + ", email=" + email + ", picture="
				+ picture + ", paid=" + paid + ", token=" + token + ", lastTokenUpdate=" + lastTokenUpdate + "]";
	}
    
    
	
}