const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// Route to fetch latitude and longitude using the geo API
app.get('/getCoords', async (req, res) => {
  const city = req.query.city; // Get the city from the query parameter

  try {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=4287408eae10a96af0b40f382a259c1a`);
    const data = response.data[0]; // Assuming you want the first result

    if (!data) {
      throw new Error('Location not found');
    }

    const { lat, lon } = data;
    res.json({ lat, lon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching location data.' });
  }
});

// Route to fetch weather data using latitude and longitude
app.get('/getWeather', async (req, res) => {
  const lat = req.query.lat; // Get latitude from the query parameter
  const lon = req.query.lon; // Get longitude from the query parameter

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4287408eae10a96af0b40f382a259c1a`);
    const weatherData = response.data;
    
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching weather data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
