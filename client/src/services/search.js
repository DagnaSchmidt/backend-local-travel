// Tasneem
// all fetch (async await) functions that return data from API

import axios from "axios";



export const getSuggestions = async (input) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/search`, {
            params: { input },
        });
        return response.data.predictions.map((prediction) => prediction.description);
    } catch (error) {
        throw new Error('Failed to fetch suggestions');
    }
};

// Function to fetch geolocation (latitude and longitude) based on a selected address
export const getLocation = async (address) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/search/geocode`, {
            params: { address },
        });
        return response.data.results[0].geometry.location; // Returning lat and lng directly
    } catch (error) {
        throw new Error('Failed to fetch location');
    }
};
