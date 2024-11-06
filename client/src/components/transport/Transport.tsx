"use client";

import React, { useState} from 'react';
import axios from "axios";
import "./styles.css";
import { FaBus, FaTrain } from "react-icons/fa";

const Transport = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [stationData, setStationData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
  
    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      sendLocationToBackend(latitude, longitude);
    };
  
    const requestGeolocation = () => {
      setLoading(true);
      setError(null);
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleSuccess, () => {
          setError("Failed to retrieve location.");
          setLoading(false);
        });
      } else {
        setError("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };
  
    const sendLocationToBackend = async (latitude: number, longitude: number) => {
      try {
        const response = await axios.post("http://localhost:3005/location", {
          latitude,
          longitude,
        });
        setStationData(response.data);
      } catch (error) {
        setError("Error fetching data from server.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="app">
        <h1>Nearby Departures</h1>
        <button onClick={requestGeolocation} disabled={loading}>
          {loading ? "Fetching location..." : "Get Departures"}
        </button>
  
        {error && <p className="error">{error}</p>}
  
        {stationData && (
          <div className="departures">
            {stationData.departures.map((departure: any, index: number) => (
              <div key={index} className="departure-card">
                <div className="icon">
                  {departure.transportCategory === "BUS" ? (
                    <FaBus />
                  ) : (
                    <FaTrain />
                  )}
                </div>
                <h3>{departure.name}</h3>
                <p>
                  <strong>Destination:</strong>{" "}
                  {departure.direction.replace(/\s*\(.*?\)\s*/g, "")}
                </p>
                <p>
                  <strong>Departure Time:</strong> {departure.time.slice(0, 5)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
export default Transport;
