"use client";
import React, { useState } from "react";
import axios from "axios";

// TypeScript types for weather data
interface WeatherData {
  date: string;
  temp: number;
  humidity: number;
  weatherIcon: string;
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  // Function to fetch weather data from backend
  const fetchWeatherData = async () => {
    try {
      const response = await axios.post("http://localhost:3001/weather", {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });

      setWeatherData(response.data.weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div>
      <h2>Weather Forecast</h2>
      <div>
        <input
          type="text"
          placeholder="Enter latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Temp °C</th>
            <th>Humidity %</th>
            <th>Weather</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((day, index) => (
            <tr key={index}>
              <td>{day.date}</td>
              <td>{day.temp.toFixed(1)}</td>
              <td>{day.humidity}%</td>
              <td>
                <img src={day.weatherIcon} alt="weather icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Weather;