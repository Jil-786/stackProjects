import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './CSS/Loader';
import { jsPDF } from 'jspdf';
import './CSS/TripPlan.css';

export default function TripPlan() {
  const location = useLocation();
  const navigate = useNavigate();
  const title = location.state?.title || "Default Title";
  const bike = { model_name: title };
  const url = process.env.REACT_APP_PLAN_API_URL;

  // Retrieve source and destination from LocalStorage
  const source = localStorage.getItem('source') || '';
  const destination = localStorage.getItem('destination') || '';

  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!source || !destination) {
      setResponseText("Source and destination are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "question": `Hey AI! Let's make this an interactive ride! 🏍️ Plan a detailed bike trip from ${source} to ${destination} on my ${bike.model_name}. Suggest must-visit places 🏞️, the best food & rest stops 🍽️😴, fuel consumption ⛽ estimates, and travel time ⏳ at different speeds. Make sure to include lots of emojis in your response to make it fun and engaging! 🎉🔥`
        }),
      });

      if (!res.ok) throw new Error('Network response was not ok');

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response available.";
      setResponseText(text);
      localStorage.setItem('tripPlanResponse', text);
      localStorage.setItem('selectedBike', bike.model_name);

    } catch (error) {
      console.error('Error fetching data:', error);
      setResponseText("Failed to fetch trip details. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [url, bike.model_name, source, destination]);

  useEffect(() => {
    const savedResponse = localStorage.getItem('tripPlanResponse');
    const savedBike = localStorage.getItem('selectedBike');

    if (savedResponse && savedBike === bike.model_name) {
      setResponseText(savedResponse);
    } else {
      fetchData();
    }
  }, [fetchData, bike.model_name]);

  // Function to download trip plan as a PDF
  const downloadPDF = async () => {
    const doc = new jsPDF();
    const marginLeft = 15;
    const marginTop = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - marginLeft * 2;
    const lineHeight = 7;
  
    // Remove unsupported characters (emojis & special symbols)
    const cleanText = responseText
      .normalize("NFKD") // Normalize text to remove special symbols
      .replace(/[^\w\s.,!?;:'"-]/g, ""); // Remove any remaining unsupported characters
  
    // Add Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(`Trip Plan from ${source} to ${destination}`, marginLeft, marginTop);
  
    doc.setFontSize(14);
    doc.text(`Bike: ${bike.model_name}`, marginLeft, marginTop + 10);
  
    // Set normal font for body text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
  
    // Split cleaned text into multiple lines
    const textLines = doc.splitTextToSize(cleanText, maxWidth);
    
    let y = marginTop + 25; // Start position for text
  
    textLines.forEach((line) => {
      if (y + lineHeight > pageHeight - 20) { 
        doc.addPage(); // Add new page if text exceeds page height
        y = marginTop;
      }
      doc.text(line, marginLeft, y);
      y += lineHeight;
    });
  
    // Save PDF
    doc.save(`TripPlan_${source}_to_${destination}.pdf`);
  };
  
  
  return (
    <div className="trip-container">
      {/* Previous Button */}
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅️ Previous
      </button>

      {/* Trip Plan Heading */}
      <h1 className="trip-heading">Trip Plan from {source} to {destination} on {bike.model_name}</h1>

      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="trip-card">
          <h2 className="trip-subheading">AI-Generated Trip Plan:</h2>
          <pre className="trip-text">{responseText}</pre>

          {/* Buttons Container */}
          <div className="trip-buttons">
            <button className="btn btn-primary" onClick={downloadPDF}>Download as PDF</button>
          </div>
        </div>
      )}
    </div>
  );
}