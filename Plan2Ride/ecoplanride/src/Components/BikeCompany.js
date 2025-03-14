import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card"; 

export default function BikeCompany() {

  const navigate = useNavigate();

  const bCompany = [
    "Hero", "Kawasaki", "Piaggio", "Indian",
    "Yamaha", "Triumph", "Royal Enfield", "JAWA",
    "BMW", "MV Agusta", "Moto Guzzi", "Suzuki",
    "Harley-Davidson", "CFMoto", "Aprilia", "Honda",
    "Bajaj", "TVS", "Mahindra", "Yezdi",
    "Ducati", "KTM", "Husqvarna", "Benelli"
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCompanies = bCompany.filter(company =>
    company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container my-4">
       {/* Previous Button */}
       <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅️ Previous
      </button>
      <h1 className="text-center display-6 fw-bold">Bike Companies</h1>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search bike companies..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* ✅ Fix: Added g-4 to ensure proper spacing between columns */}
      <div className="row g-4">
        {filteredCompanies.map((company, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center" key={index}>
            <Card 
              title={company} 
              img={`/BikeLogos/${company}.png`} 
              uri="/home/bikesCompany/model"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
