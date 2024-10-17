// Tasneem
// all fetch (async await) functions that return data from API

import axios from "axios";



export const getLocation = async (address) => {

    try {
        //  const respones = await await axios.get(`${process.env.REACT_APP_BACKEND_URL}`,{
            

        const respones = await axios.get( `http://localhost:8000/api/search`,{
            params: {address},
        });
          return respones.data
    } catch (error) {
        throw new Error('Failed to fetch location');
    }

   

}