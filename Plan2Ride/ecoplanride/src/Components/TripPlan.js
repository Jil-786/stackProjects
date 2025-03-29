import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './CSS/Loader';
import Popup from './Popup';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import './CSS/TripPlan.css';

export default function TripPlan({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const title = location.state?.title || "Default Title";
  const bike = { model_name: title };
  const url = process.env.REACT_APP_PLAN_API_URL;

  const source = localStorage.getItem('source') || '';
  const destination = localStorage.getItem('destination') || '';

  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const fetchData = useCallback(async () => {
    if (!source || !destination) {
      setError("Source and destination are required.");
      return;
    }

    if (user.token <= 0) { // Prevent API call if tokens are 0
      setPopupMessage("No tokens left! Upgrade to premium.");
      setShowPopup(true);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Fetch Trip Plan
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "question": `Hey AI! Let's make this an interactive ride! 🏍️ Plan a detailed bike trip from ${source} to ${destination} on my ${bike.model_name}. Suggest must-visit places 🏞️, the best food & rest stops 🍽️😴, fuel consumption ⛽ estimates, and travel time ⏳ at different speeds. Make sure to include lots of emojis in your response to make it fun and engaging! 🎉🔥`
        }),
      });

      if (!res.ok) throw new Error('Network response was not ok');

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Check if the response is complete
      if (text.length < 50) { // Example: Skip very short responses
        console.warn("Partial or incomplete response detected, skipping token deduction.");
        return;
      }

      setResponseText(text);
      localStorage.setItem('tripPlanResponse', text);
      localStorage.setItem('selectedBike', bike.model_name);

      // Deduct Token After a Valid Response
      const tokenResponse = await axios.put(`${process.env.REACT_APP_USER_DATA}/auth/use-token?email=${user.email}`);
      if (tokenResponse.data.status === "error") {
        setPopupMessage("No tokens left! Come back tomorrow.");
        setShowPopup(true);
      } else {
        setUser((prevUser) => ({ ...prevUser, token: prevUser.token - 1 }));
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      setError("Failed to fetch trip details. Please try again.");
    } finally {
      setLoading(false);
    }
}, [url, bike.model_name, source, destination, user, setUser]);

  useEffect(() => {
    const savedResponse = localStorage.getItem('tripPlanResponse');
    const savedBike = localStorage.getItem('selectedBike');

    // Prevent fetching data if tokens are 0
    if (user.token <= 0) {
      setPopupMessage("No tokens left! Come back tomorrow.");
      setShowPopup(true);
      return; // Stop execution
    }

    // Only fetch data if there's no cached response or the selected bike has changed
    if (!savedResponse || savedBike !== bike.model_name) {
      fetchData(); // Call fetchData only when necessary
    } else {
      setResponseText(savedResponse); // Use cached response
    }
    // Remove fetchData from dependencies to avoid unnecessary re-triggering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bike.model_name, user.token]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    const marginLeft = 15;
    const marginTop = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - marginLeft * 2;
    const lineHeight = 7;

    const cleanText = responseText
      .normalize("NFKD")
      .replace(/[^\w\s.,!?;:'"-]/g, "");

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(`Trip Plan from ${source} to ${destination}`, marginLeft, marginTop);

    doc.setFontSize(14);
    doc.text(`Bike: ${bike.model_name}`, marginLeft, marginTop + 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    const textLines = doc.splitTextToSize(cleanText, maxWidth);
    let y = marginTop + 25;

    textLines.forEach((line) => {
      if (y + lineHeight > pageHeight - 20) {
        doc.addPage();
        y = marginTop;
      }
      doc.text(line, marginLeft, y);
      y += lineHeight;
    });

    doc.save(`TripPlan_${source}_to_${destination}.pdf`);
  };

  return (
    <div className="trip-container">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅️ Previous
      </button>

      <h1 className="trip-heading">Trip Plan from {source} to {destination} on {bike.model_name}</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="trip-card">
          <h2 className="trip-subheading">AI-Generated Trip Plan:</h2>
          <pre className="trip-text">{responseText}</pre>

          <div className="trip-buttons">
            <button className="btn btn-primary" onClick={downloadPDF}>Download as PDF</button>
          </div>
        </div>
      )}

      {showPopup && (
        <Popup
          message={popupMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}