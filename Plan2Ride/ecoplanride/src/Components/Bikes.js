import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./Card";
import Loader from "./CSS/Loader";
import axios from "axios";
export default function Bikes() {
  const location = useLocation();
  const navigate = useNavigate();
  const title = location.state?.title || "Default Title";

  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {

    const fetchData = async () => {
      try {
        const url = `${process.env.REACT_APP_GATEWAY_URL}/search?prefix=${title}`;
        //console.log("Fetching from:", url); // Debugging
    
        const response = await axios.get(url, {
          headers: {
            "Accept": "application/json"
          }
        });
    
       // console.log("Raw Response:", response.data); // Log response
        setBikes(response.data); // Axios auto-parses JSON
      } catch (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [title]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBikes = bikes.filter(bike =>
    bike.model_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container my-4">
      {/* Previous Button */}
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅️ Previous
      </button>
      <h1 className="text-center display-6 fw-bold">{title} Bikes</h1>

      {/* Search Input */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search bikes..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* ✅ Fix: Centered Loader */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <Loader />
        </div>
      ) : (
        <div className="row g-4"> {/* ✅ Fix: Added g-4 for spacing */}
          {filteredBikes.map((bike, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center" key={bike.id || `${bike.model_name}-${index}`}>
              <Card 
                title={bike.model_name} 
                description={
                  <>
                    <b>CC:</b> {bike.cc} cc  <br />
                    <b>Mileage:</b> {bike.mileage} km/l<br />
                    <b>Weight:</b> {bike.weight_in_kg} kg<br />
                  </>
                } 
                img={`/BikeLogos/${title}.png`} 
                uri="/home/bikesCompany/model/tripPlan"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
