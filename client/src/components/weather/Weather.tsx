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
    <div>
      <h2>Weather Forecast</h2>
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

export default Weather;
