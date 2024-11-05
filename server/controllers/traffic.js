import express from 'express';
import axios from 'axios';

const trafficRouter = express.Router();


const API_KEY = "ab6c9b35949b452eb688d80d9dd81817";
const API_URL = "https://api.trafikinfo.trafikverket.se/v2/data.json";


const xmlData = `
<REQUEST>
  <LOGIN authenticationkey="${API_KEY}"/>
  <QUERY objecttype="Situation" schemaversion="1" limit="10">
    <FILTER>
      <NEAR name="Deviation.Geometry.WGS84" value="18.063240 59.334591"/>
      <GT name="Deviation.CreationTime" value="2024-11-05T12:00:00.000+01:00"/>
    </FILTER>
  </QUERY>
</REQUEST>
`;

trafficRouter.get('/fetch-data', (req, res) => {
  axios
    .post(API_URL, xmlData, {
      headers: { "Content-Type": "text/xml" }
    })
    .then(response => {
      console.log("Received response:", response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.error("Request failed:", error.response ? error.response.data : error.message);
      res.status(500).json({
        message: "Failed to fetch data",
        error: error.response ? error.response.data : error.message
      });
    });
});


export { trafficRouter };
