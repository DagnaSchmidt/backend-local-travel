"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "@/store/store";

// TypeScript types for weather data
interface WeatherData {
  date: string;
  temp: number;
  humidity: number;
  weatherIcon: string;
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  
  // Localization state from search reducer
  const localization = useAppSelector((state) => state.search);

  useEffect(() => {
    if (localization.lat && localization.lon) {
      fetchWeatherData(localization.lat, localization.lon);
    }
  }, [localization]);

  // Function to fetch weather data from backend
  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.post("http://localhost:3002/api/weather", {
        latitude,
        longitude,
      });

      setWeatherData(response.data.weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Weather Forecast</h2>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
      }}>
        <thead>
          <tr style={{ backgroundColor: "#555", color: "white", textAlign: "center" }}>
            <th style={{ padding: "12px" }}>Day</th>
            <th style={{ padding: "12px" }}>Temp °C</th>
            <th style={{ padding: "12px" }}>Humidity %</th>
            <th style={{ padding: "12px" }}>Weather</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((day, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#e0e0e0" }}>
              <td style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ccc", color: "#333" }}>{day.date}</td>
              <td style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ccc", color: "#333" }}>{day.temp.toFixed(1)}°C</td>
              <td style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ccc", color: "#333" }}>{day.humidity}%</td>
              <td style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ccc" }}>
                <img src={day.weatherIcon} alt="weather icon" style={{ width: "30px", height: "30px" }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Weather;