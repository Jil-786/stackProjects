import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from './Components/NavBar';
import About from './Components/About';
import BikeCompany from './Components/BikeCompany';
import Bikes from './Components/Bikes';
import TripPlan from './Components/TripPlan';
import OSMMap from './Components/OSMMap';
import Base from './Components/Base';
import Login from './Components/Login';
import HomeLayout from './Components/HomeLayout';
import SuggestionsForm from './Components/SuggestionForm';

function App() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleConfirmRoute = (src, dest) => {
    setSource(src);
    setDestination(dest);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_OAUTH_URL}/auth/userinfo`, { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <Router>
      {user ? (
        <>
         <NavBar title="EcoMotoPlan" user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Base />} />
            <Route path="/about" element={<About />} />
            <Route path="/suggest" element={<SuggestionsForm user={user} />} />
            
            {/* Home Layout for nested routes */}
            <Route path="/home" element={<HomeLayout onConfirm={handleConfirmRoute} />}>
              <Route index element={<OSMMap onConfirm={handleConfirmRoute} />} />
              <Route path="bikesCompany" element={<BikeCompany />} />
              <Route path="bikesCompany/model" element={<Bikes />} />
              <Route path="bikesCompany/model/tripPlan" element={<TripPlan 
                source={source} 
                destination={destination} 
                user={user} 
                setUser={setUser} 
              />} />
            </Route>

            {/* Redirect /login to home if logged in */}
            <Route path="/login" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          {/* Redirect all protected routes to login */}
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
