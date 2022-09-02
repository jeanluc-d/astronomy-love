/* eslint-disable import/extensions */
import express from 'express';
import NodeCache from 'node-cache';
import fetch from 'node-fetch';
import { numberOfDaysInBetweenDates } from '../../utils/utils.js';

const router = express.Router();

const cache = new NodeCache({ checkperiod: 0 });
// env variables
const { NASA_APOD_URL, NASA_API_KEY } = process.env;

router.get('/pictures', async (req, res) => {
  try {
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;
    if (!startDate || !endDate) {
      res.status(400).json({ message: 'Missing start_date or end_date' });
      return;
    }
    console.log('startDate', startDate);
    console.log('endDate', endDate);
    const cacheKey = `${startDate}_${endDate}`;

    // check if translation is cached
    const cachedPictures = cache.get(cacheKey);
    if (cachedPictures) {
      console.log('cache hit');
      // send cached translation
      res.status(200).json(cachedPictures);
      return;
    }

    const apiResponse = await fetch(`${NASA_APOD_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await apiResponse.json();

    // need to reverse the data since the API returns the oldest date first
    const pictures = data.reverse();
    const numberOfDaysInBetweenDate = numberOfDaysInBetweenDates(startDate, endDate);
    if (numberOfDaysInBetweenDate === data.length) {
      cache.set(cacheKey, pictures, 1000 * 60 * 60 * 24);
    }
    res.status(200).json(pictures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
