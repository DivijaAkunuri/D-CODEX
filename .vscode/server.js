const express = require('express');
const axios = require('axios'); // Install this with: npm install axios

const app = express();
const port = 3000;

// OpenWeatherMap API configuration
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_API_KEY = 'a25b249306e2923eb3824b18a143bf5e'; // Replace with your actual API key

// Serve static files
app.use(express.static('public'));

// API endpoint for real-time data
app.get('/api/data', async (req, res) => {
  try {
    // Fetch weather data from an external API
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        q: 'Bangalore', // City name
        appid: WEATHER_API_KEY, // Pass API key here
        units: 'metric' // Use metric units for temperature
      }
    });

    // Extract necessary data
    const weatherData = {
      temp: response.data.main.temp,
      humidity: response.data.main.humidity
    };

    // Example air quality and vaccination data (hardcoded for now)
    const airQuality = { aqi: 120, pm25: 35 };
    const vaccination = { rate: 75 };

    // Respond with combined data
    res.json({
      weather: weatherData,
      airQuality,
      vaccination,
      disease: { riskLevel: 'Moderate' }
    });
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
