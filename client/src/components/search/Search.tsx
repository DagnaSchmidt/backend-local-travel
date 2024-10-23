"use client";
import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import { Cloud } from "lucide-react";

const Search: React.FC = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
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
        setSelectedLocation({
          name: suggestion,
          lat: location.lat,
          lng: location.lng,
        });
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching geocode data", error);
    }
  };

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Local Travel & Weather Dashboard
      </h1>
      <p className="font-semibold mb-4">Enter your address to see public transport Depatures ,Local weather ,and traffic incidents </p>

      <div className="w-full max-w-md">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-900"
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type an address..."
          autoFocus
          required
        />
        <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li 
            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            key={index} 
            onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
      {selectedLocation && (
       <div className="mt-6 p-4 bg-white border border-gray-200 rounded-md shadow-md w-full max-w-md">
       <h2 className="text-xl font-semibold text-gray-700 mb-4">Selected Location</h2>
       <p className="text-gray-600"><strong>Location Name:</strong> {selectedLocation.name}</p>
       <p className="text-gray-600"><strong>Latitude:</strong> {selectedLocation.lat}</p>
       <p className="text-gray-600"><strong>Longitude:</strong> {selectedLocation.lng}</p>
   </div>
      )}
    </div>
  );
};

export default Search;
