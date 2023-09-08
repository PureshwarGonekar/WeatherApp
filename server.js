const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// Serve the static React build files
app.use(express.static('weather-app/build'));

app.get('/weather', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather?lat=22.0578244&lon=78.9386203&appid=4287408eae10a96af0b40f382a259c1a'
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching weather data.' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
