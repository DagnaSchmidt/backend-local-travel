import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors()); // Allow requests from the frontend
app.use(express.json()); // Middleware to parse JSON bodies

// OpenWeather API details
const apiKey = "d0cdedf311595e6787a701b38eb9b472";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast";

// Function to fetch weather data based on latitude and longitude
const getWeatherData = async (latitude, longitude) => {
  try {
    const response = await axios.get(weatherApiUrl, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: apiKey,
        units: "metric", // Convert temperature to Celsius
      },
    });

    // Filter and format data for 5-day forecast at 12:00 PM
    const weatherData = response.data.list
      .filter((item) => item.dt_txt.includes("12:00:00"))
      .slice(0, 5)
      .map((item) => ({
        date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        temp: item.main.temp,
        humidity: item.main.humidity,
        weatherIcon: "https://openweathermap.org/img/wn/${item.weather[0].icon}.png",
      }));

    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

// POST route to handle location and return weather data
app.post("/weather", async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const weatherData = await getWeatherData(latitude, longitude);
    res.json({ weatherData });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Start the server
app.listen(port, () => {
  console.log("Server running on http://localhost:${port}");
});
