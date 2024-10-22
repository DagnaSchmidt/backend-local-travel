"use client";
import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import { SearchCheck } from "lucide-react";

const Search: React.FC = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const fetchSuggestions = async () => {
    if (input) {
      try {
        const response = await axios.get(`http://localhost:8000/api/search`, {
          params: { input },
        });
        setSuggestions(
          response.data.predictions.map(
            (prediction: any) => prediction.description
          )
        );
      } catch (error) {
        console.error("Error fetching suggestions", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    fetchSuggestions();
  };

  const handleSuggestionClick = async (suggestion: string) => {
    try {
      // Make a call to the backend server to get geocode data
      const geocodeResponse = await axios.get(
        "http://localhost:8000/api/search/geocode",
        {
          params: {
            address: suggestion,
          },
        }
      );

      if (geocodeResponse.data.results.length > 0) {
        const location = geocodeResponse.data.results[0].geometry.location;
        setSelectedLocation({ lat: location.lat, lng: location.lng });
      }
    } catch (error) {
      console.error("Error fetching geocode data", error);
    }
  };

  return (
    <div>
      <h1>Address Auto-Suggestion</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type an address..."
      />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
      {selectedLocation && (
        <div>
          <h2>Selected Location Coordinates:</h2>
          <p>Latitude: {selectedLocation.lat}</p>
          <p>Longitude: {selectedLocation.lng}</p>
        </div>
      )}
    </div>
  );
};

export default Search;
