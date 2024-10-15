import express from 'express';

export const placesRouter = express.Router();

placesRouter.get('/', async (req, res) => {
    const lat = req.body.lat;
    const lon = req.body.lon;

    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];
        node["amenity"~"cafe|restaurant|bar"](around:1000,${lat},${lon});
        out body;`;

    try {
        const result = await fetch(overpassUrl);
        const data = await result.json();
        const places = data.elements;
        res.json(places);
    } catch (error) {
        console.log(`Error fetching data from overpass API: ${error}`);
    }
});
