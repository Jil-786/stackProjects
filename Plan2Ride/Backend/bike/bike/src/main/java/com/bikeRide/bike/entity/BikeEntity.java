package com.bikeRide.bike.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value="bikes")
public class BikeEntity {
	//model_name,price,CC,mileage,type_of_bike,weight_in_kg,links,acceleration_speed,top_speed
	@Id
	private String modelName;
	private String cc;
	private double mileage;
	private double weight_in_kg;
	private double acceleration_speed;
	private double top_speed;
	public String getModel_name() {
		return modelName;
	}
	public void setModel_name(String model_name) {
		this.modelName = model_name;
	}
	public String getCC() {
		return cc;
	}
	public void setCC(String cC) {
		this.cc = cC;
	}
	public double getMileage() {
		return mileage;
	}
	public void setMileage(double mileage) {
		this.mileage = mileage;
	}
	public double getWeight_in_kg() {
		return weight_in_kg;
	}
	public void setWeight_in_kg(double weight_in_kg) {
		this.weight_in_kg = weight_in_kg;
	}
	public double getAcceleration_speed() {
		return acceleration_speed;
	}
	public void setAcceleration_speed(double acceleration_speed) {
		this.acceleration_speed = acceleration_speed;
	}
	public double getTop_speed() {
		return top_speed;
	}
	public void setTop_speed(double top_speed) {
		this.top_speed = top_speed;
	}
	
}
