"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// API key ve endpoint ayarları
const API_KEY = 'd0cdedf311595e6787a701b38eb9b472'; // OpenWeather API anahtarınızı buraya ekleyin

// Alingsås, İsveç koordinatları
const LAT = 57.9302;
const LON = 12.5339;
const BASE_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${LAT}&lon=${LON}&exclude={part}&appid=${API_KEY}`; // OneCall API endpoint

// API'den gelen hava durumu verileri için TypeScript tip tanımlamaları
interface WeatherData {
  date: string;
  temp: number;
  humidity: number;
  weatherIcon: string;
}

// OpenWeather API'den dönen veri tipleri
interface OpenWeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number; // Precipitation probability
    rain?: {
      '3h': number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  // Haftanın günleri
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    // Hava durumu verilerini almak için API çağrısı
    const fetchWeatherData = async () => {
      try {

        const response = await axios.get<OpenWeatherResponse>(`https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}`);
       // console.log(response);

        // 5 günlük hava durumu verisi
        const data = response.data.list
        .filter(item => item.dt_txt.includes('12:00:00')) // Filter to get only the 12:00 entries (midday)
        .slice(0, 5) // Get 5 days
        .map((item, index) => ({
          date: daysOfWeek[new Date(item.dt * 1000).getDay()], // Convert Unix timestamp to day of the week
          temp: (item.main.temp - 273.15), // Convert temperature from Kelvin to Celsius and format to 1 decimal place
          humidity: item.main.humidity, // Humidity percentage
          weatherIcon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`, // Weather icon
        }));
      

        setWeatherData(data);
      } catch (error) {
        console.error('Hava durumu verisi alınırken hata oluştu:', error);
      }
    };

    fetchWeatherData();
  }, []); // Boş bağımlılık dizisi ile sadece ilk renderda API çağrısı yapılır

  return (
    <div>
      <h2>Alingsås Weather</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Temp °C</th>
            <th>Rain %</th>
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
