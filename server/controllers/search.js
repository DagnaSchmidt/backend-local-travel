import express from "express";
export const searchRouter = express.Router();

// Tasneem
// all http requests here

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();



searchRouter.get("/", async (req, res) => {
  const { input } = req.query;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});
// New route to handle geocoding request
searchRouter.get("/geocode", async (req, res) => {
    const { address } = req.query;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
    try {
      const geocodeResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
      );
  
      res.json(geocodeResponse.data);
    } catch (error) {
      res.status(500).json({ error: "Error fetching geocode data" });
    }
  });
