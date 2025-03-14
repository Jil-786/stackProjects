import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './Components/NavBar';
import About from './Components/About';
import BikeCompany from './Components/BikeCompany';
import Bikes from './Components/Bikes';
import TripPlan from './Components/TripPlan';
import OSMMap from './Components/OSMMap';
import Base from './Components/Base';
import Form from './Components/Form';
import HomeLayout from './Components/HomeLayout';
import SuggestionsForm from './Components/SuggestionForm';

function App() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const handleConfirmRoute = (src, dest) => {
    setSource(src);
    setDestination(dest);
  };

  return (
    <Router>
      <NavBar title="EcoMotoPlan" />
      <Routes>
        <Route path="/" element={<Base />} />
        <Route path="/login" element={<Form />} />
        <Route path="/about" element={<About />} />
        <Route path="/suggest" element={<SuggestionsForm/>} />

        {/* Home Layout for nested routes */}
        <Route path="/home" element={<HomeLayout onConfirm={handleConfirmRoute} />}>
          <Route index element={<OSMMap onConfirm={handleConfirmRoute} />} />
          <Route path="bikesCompany" element={<BikeCompany />} />
          <Route path="bikesCompany/model" element={<Bikes />} />
          <Route path="bikesCompany/model/tripPlan" element={<TripPlan source={source} destination={destination} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
