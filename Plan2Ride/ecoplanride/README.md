# EcoMotoPlan

EcoMotoPlan is a smart trip-planning application designed for motorcycle riders. Using **Spring AI**, it generates optimized travel itineraries based on the provided **source, destination, and bike model**. The AI suggests **places to visit, rest stops, fuel estimations, and travel times** based on the bike's speed.

## Features
- AI-powered **trip itinerary generation**
- **Estimated travel time** based on bike speed
- **Recommended stops** for rest, food, and sightseeing
- **Fuel consumption estimation**

## Technologies Used
- **Spring Boot** (Backend)
- **Spring AI** (AI-driven itinerary generation)
- **Consul for service discovery** (For Microservices)
- **React** (Frontend)
- **Tailwind CSS** (UI Styling)
- **Bootstrap** (UI Styling)
- **MongoDB** (DataBase)
- **.env** (Configuration for API URLs)

## Setup and Installation

### Backend (Spring Boot)
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/EcoMotoPlan.git
   cd EcoMotoPlan
   ```
2. Configure **application.properties**:
   ```properties
   spring.ai.api.key=YOUR_API_KEY
   ```
3. Build and run the project:
   ```sh
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend (React)
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure **.env**:
   ```env
  REACT_APP_GATEWAY_URL=http://localhost:7000 **gateway**
  REACT_APP_PLAN_API_URL=http://localhost:2000/gemini/ask ** AI**
  REACT_APP_PRODUCER_URL=http://localhost:9100 ** for  kafka**
   ```
4. Start the frontend:
   ```sh
   npm start
   ```

## Usage
1. Enter **source, destination, and bike model** in the UI.
2. The AI generates an optimized trip plan.
3. View details like **places to visit, rest stops, fuel estimate, and travel time**.

## Contributing
Feel free to fork this repository and submit pull requests to improve the project.


## Contact
For questions or collaboration, reach out at **jilanibabu78649@gmail.com**.

