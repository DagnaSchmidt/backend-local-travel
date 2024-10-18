"use client";
import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import { SearchCheck } from "lucide-react";



/*interface searchInput {
  lat: number;
  lng: number;

}

const Search = () => {
  const [address, setAddress] = useState<string>("");
  const [searchInput, setSearchInput] = useState<searchInput | null>(null);
  const [error, setError] = useState<string>();

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };


  const handlesearchbutton = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter")
      try {
        const response = await axios.get<searchInput>(
          // `${process.env.REACT_APP_BACKEND_URL}`,
           `http://localhost:8000/api/search`,
          {
            params: { address },
          }
        );
        setSearchInput(response.data);
        setError("");
      } catch (error) {
        setError("Could not find the address");
        setSearchInput(null);
      }
  };

  return (
    <div>
     

      <div>
        <h3> welcome to the Local Travel and weather Dashboard</h3>
        <p>
          Enter your address to see public transport depatures, <br />
          Local weather,and Trafic incidents
        </p>
      </div>
      <div className="max-w-lg mx-auto mt-10 p-4 bg-gray-100 rounded shadow">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter city Name"
            value={address}
            onChange={handleAddressChange}
            onKeyDown={handlesearchbutton}
            className="border p-2 rounded w-full pr-10"
            required
          />
          <span className="absolute top-2 right-3 text-gray-400">
            
            <SearchCheck />
          </span>
        </div>
        {searchInput &&
          searchInput.lat !== undefined &&
          searchInput.lng !== undefined && (
            <div className="mt-4">
              <p>Latitude: {searchInput.lat}</p>
              <p>Longitude: {searchInput.lng}</p>
            </div>
          )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Search;*/


const Search: React.FC = () => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const fetchSuggestions = async () => {
        if (input) {
            try {
                const response = await axios.get(`http://localhost:8000/api/search`, {
                    params: { input }
                });
                setSuggestions(response.data.predictions.map((prediction: any) => prediction.description));
            } catch (error) {
                console.error('Error fetching suggestions', error);
                console.log(suggestions);
                
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        fetchSuggestions();
        console.log(input);
        
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
                    <li key={index}>{suggestion}</li>
                ))}
            </ul>
        </div>
    );
};


  



export default Search;