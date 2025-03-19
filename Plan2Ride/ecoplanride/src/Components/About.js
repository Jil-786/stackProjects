import React from 'react';
import './CSS/About.css';

export default function About() {
  return (
    <div className="about-container">
      {/* Card for the App */}
      <div className="about-card">
        <h1 className='display-6 fw-bold' >About EcoMotoPlan</h1>
        <p>
          Welcome to EcoMotoPlan! We are dedicated to providing the best planning resources for your motorbike trips. Discover the best routes, places to visit, stops for breaks, and accommodations along your journey.
        </p>
        <h2 className='display-8 fw-bold'>Our Mission</h2>
        <p>
          Our mission is to inspire and support motorbike enthusiasts by offering comprehensive trip plans, expert advice, and a vibrant community.
        </p>
        <h2 className='display-8 fw-bold'>Plan Your Trip</h2>
        <p>
          Plan your journey with us and find out the best places to visit, where to take breaks, and where to stay. We also provide estimates on travel time and fuel costs based on your motorbike.
        </p>
      </div>

      {/* Card for About You */}
      <div className="about-card">
        <h1 className='display-6 fw-bold'>About Me</h1>
        <p>
          I'm a Java developer with 2 years of experience, passionate about building applications that solve real-world problems. My current project, EcoMotoPlan, is designed to help motorbike travelers plan efficient and enjoyable journeys.
        </p>
        <h2 className='display-8 fw-bold'>Skills & Interests</h2>
        <p>
          I have experience in Java, Spring Boot, React, and working with APIs. Apart from coding, I enjoy motorbike trips, which inspired the creation of EcoMotoPlan.
        </p>
        <h2 className='display-8 fw-bold'>Contact Me</h2>
        <p>
          Feel free to reach out at <a href="mailto:Jilanibabu78649@gmail.com">Jilanibabu78649@gmail.com</a> for collaboration or suggestions.
        </p>
      </div>
    </div>
  );
}