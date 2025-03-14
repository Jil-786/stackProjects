import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import './CSS/OSMMap.css';
import Popup from './Popup';

export default function OSMMap({ onConfirm, onMapReady }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [map, setMap] = useState(null);
  const [source, setSource] = useState(localStorage.getItem('source') || '');
  const [destination, setDestination] = useState(localStorage.getItem('destination') || '');
  const [sourceMarker, setSourceMarker] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [sourceIcon, setSourceIcon] = useState(null);
  const [destinationIcon, setDestinationIcon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [routeControl, setRouteControl] = useState(null);
  const [routeCalculated, setRouteCalculated] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const start = queryParams.get('start');
    const dest = queryParams.get('destination');

    if (start) setSource(start);
    if (dest) setDestination(dest);

    if (L.DomUtil.get('map') !== null) {
      L.DomUtil.get('map')._leaflet_id = null;
    }

    const initializedMap = L.map('map').setView([20.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(initializedMap);

    const srcIcon = L.divIcon({
      html: '<div><div class="marker-emoji">📍</div><div class="marker-label">Source</div></div>',
      iconSize: [60, 60],
      iconAnchor: [15, 30],
      className: 'source-marker-icon'
    });

    const destIcon = L.divIcon({
      html: '<div><div class="marker-emoji">📌</div><div class="marker-label">Destination</div></div>',
      iconSize: [80, 60],
      iconAnchor: [15, 30],
      className: 'destination-marker-icon'
    });

    setSourceIcon(srcIcon);
    setDestinationIcon(destIcon);
    setMap(initializedMap);

    // Notify that the map is ready
    if (typeof onMapReady === 'function') {
      onMapReady();
    }
  }, [location.search, onMapReady]);

  useEffect(() => {
    localStorage.setItem('source', source);
  }, [source]);

  useEffect(() => {
    localStorage.setItem('destination', destination);
  }, [destination]);

  const geocodePlace = async (placeName) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      } else {
        throw new Error('Location not found');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      setPopupMessage(`Could not find location: ${placeName}`);
      return null;
    }
  };

  const calculateDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(coords2[0] - coords1[0]);
    const dLon = toRad(coords2[1] - coords1[1]);
    const lat1 = toRad(coords1[0]);
    const lat2 = toRad(coords2[0]);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleRoute = async () => {
    if (!map || !source || !destination || !sourceIcon || !destinationIcon) return;

    setIsLoading(true);

    try {
      if (sourceMarker) map.removeLayer(sourceMarker);
      if (destinationMarker) map.removeLayer(destinationMarker);
      if (routeControl) map.removeControl(routeControl);

      let sourceCoords, destCoords;

      if (source.includes(',')) {
        sourceCoords = source.split(',').map(Number);
      } else {
        sourceCoords = await geocodePlace(source);
        if (!sourceCoords) {
          setIsLoading(false);
          return;
        }
      }

      if (destination.includes(',')) {
        destCoords = destination.split(',').map(Number);
      } else {
        destCoords = await geocodePlace(destination);
        if (!destCoords) {
          setIsLoading(false);
          return;
        }
      }

      const distance = calculateDistance(sourceCoords, destCoords);
      if (distance < 80) {
        setPopupMessage(`The trip distance is ${distance.toFixed(2)} km. It should be >= 80 km.`);
        setIsLoading(false);
        return;
      }

      const newSourceMarker = L.marker(sourceCoords, {
        icon: sourceIcon
      }).addTo(map);
      setSourceMarker(newSourceMarker);

      const newDestMarker = L.marker(destCoords, {
        icon: destinationIcon
      }).addTo(map);
      setDestinationMarker(newDestMarker);

      const bounds = L.latLngBounds([sourceCoords, destCoords]);
      map.fitBounds(bounds, { padding: [50, 50] });

      const newRouteControl = L.Routing.control({
        waypoints: [
          L.latLng(sourceCoords),
          L.latLng(destCoords)
        ],
        routeWhileDragging: true,
        createMarker: function() { return null; },
        lineOptions: {
          styles: [{ color: '#6FA1EC', weight: 4 }]
        }
      }).addTo(map);

      setRouteControl(newRouteControl);

      newRouteControl.on('routesfound', function() {
        console.log('Route found!');
        setIsLoading(false);
        setRouteCalculated(true);
      });

      setTimeout(() => {
        setIsLoading(false);
      }, 10000);

    } catch (error) {
      console.error('Error calculating route:', error);
      setPopupMessage('Error calculating route. Please try again.');
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    if (routeCalculated && typeof onConfirm === 'function') {
      onConfirm(source, destination);
      navigate('/home/bikesCompany');
    } else {
      setPopupMessage('Please calculate a valid route before confirming.');
    }
  };

  return (
    <div className="osm-map-container">
      <div className="control-panel">
        <div className="input-container">
          <input
            type="text"
            className="map-input"
            placeholder="Source (place name or lat,lng)"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <input
            type="text"
            className="map-input"
            placeholder="Destination (place name or lat,lng)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <button 
            className="route-button"
            onClick={handleRoute}
            disabled={isLoading}
          >
            {isLoading ? 'Calculating Route...' : 'Show Route'}
          </button>
          <button  type="button" 
            className="btn btn-primary confirm-button"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            Confirm Route
          </button>
        </div>

        {isLoading && (
          <div className="loading-indicator">
            <div className="loader"></div>
            <span>Calculating the best route...</span>
          </div>
        )}

        <div className="help-text">
          <p>You can enter either a place name (e.g., "India") or coordinates (e.g., "20.5937,78.9629")</p>
        </div>
      </div>

      <div id="map" style={{ height: '100vh' }}></div>

      {popupMessage && (
        <Popup message={popupMessage} onClose={() => setPopupMessage('')} />
      )}
    </div>
  );
}