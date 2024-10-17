import express from 'express';

export const searchRouter = express.Router();

// Tasneem
// all http requests here


import axios from 'axios'; 
import dotenv from 'dotenv';
dotenv.config();

searchRouter.get('/', async (req, res) => {
     const { address } = req.query;
    // const  address  = "Helsingborg+C";
    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        // Making a request to Google Geocoding API to get latitude and longitude
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address: address,
                key: process.env.GOOGLE_MAPS_API_KEY,
            },
        });

        // if (response.data.status === 'OK') {
        //     const location = response.data.results[0].geometry.location;
        //     res.json(location);
        // } else {
        //     res.status(404).json({ error: 'Address not found' });
        // }
        res.json(response.data.results);
    } catch (error) {
        console.error('Error fetching address suggestions:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
