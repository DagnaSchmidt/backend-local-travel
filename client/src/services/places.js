import axios from 'axios';
const baseUrl = 'http://localhost:8000/api/places';

export const getPlaces = async (data) => {
    const response = await axios.post(baseUrl, data);
    return response.data;
};
