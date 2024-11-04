
// transportRouter.js

import express from "express";
import axios from "axios";

import cors from "cors";
export const transportRouter = express.Router();

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = "d28406c2-72a7-42a9-8a3c-183a11a8f46c";
const stationsProximityApiUrl = `https://api.resrobot.se/v2.1/location.nearbystops`;
const departureBoardApiUrl = `https://api.resrobot.se/v2.1/departureBoard`;

const getNearestStationId = async (latitude, longitude) => {
  try {
    const response = await axios.get(stationsProximityApiUrl, {
      params: {
        originCoordLat: latitude,
        originCoordLong: longitude,
        format: "json",
        accessId: apiKey,
      },
    });
    const nearestStation = response.data.stopLocationOrCoordLocation[0].StopLocation;
    return nearestStation.id;
  } catch (error) {
    console.error("Error fetching nearest station:", error);
    throw error;
  }
};

const getDepartureBoard = async (stationId) => {
  try {
    const response = await axios.get(departureBoardApiUrl, {
      params: {
        id: stationId,
        format: "json",
        accessId: apiKey,
      },
    });
    const departures = response.data.Departure.slice(0, 5); 
    return departures;
  } catch (error) {
    console.error("Error fetching departure board:", error);
    throw error;
  }
};

app.post("/location", async (req, res) => {
  const { latitude, longitude } = req.body;
  console.log(req.body)

  try {
    const stationId = await getNearestStationId(latitude, longitude);
    if (stationId) {
      const departures = await getDepartureBoard(stationId);
      res.json({ departures });
    } else {
      res.status(400).json({ error: "No station found near the location." });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


// Ripandeep
// all http requests here


app.listen(3005, () => {
    console.log(`Server running on port 3005`);
});
