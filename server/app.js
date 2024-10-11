import express from 'express';
import cors from 'cors';

import { searchRouter } from './controllers/search.js';
import { weatherRouter } from './controllers/weather.js';
import { trafficRouter } from './controllers/traffic.js';
import { transportRouter } from './controllers/transport.js';

export const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

//routes
app.use('/api/search', searchRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/traffic', trafficRouter);
app.use('/api/transport', transportRouter);
