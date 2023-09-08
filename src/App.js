import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress from Material-UI

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading status

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when the form is submitted

    axios
      .get(`http://localhost:3001/getCoords?city=${city}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        const { lat, lon } = response.data;
        return axios.get(`http://localhost:3001/getWeather?lat=${lat}&lon=${lon}`);
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false); // Stop loading after the API request is complete
      });
  };
  const bgcolor = {
    background: 'linear-gradient(103deg, rgba(223,221,255,1) 15%, rgba(255,255,250,1) 92%, rgba(255,255,250,1) 95%)'
  };


  return (
    <div className="App ">
      <header className="App-header ">
        <h1 className='font-serif text-4xl mb-10'>Weather App</h1>
        <form className='flex justify-center' onSubmit={handleFormSubmit}>
          <input
            className='text-black h-12  rounded-sm pl-2'
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <button className='h-12 ml-1 rounded-sm text-base bg-lime-500 hover:bg-lime-600 p-2 mb-5' type="submit">Get Weather</button>
        </form>
        {loading ? ( // Display loader while loading is true
          <CircularProgress color="secondary" />
        ) : weatherData ? (
          <div style={bgcolor} className='border-4 p-7 rounded-xl border-lime-500 font-normal bg-white text-blue-900 shadow-[0_35px_60px_-15px_rgba(10,30,0.3)] hover:shadow-lg'>
            <h2 className='font-semibold'>{weatherData.name}, {weatherData.sys.country}</h2>
            <p>{weatherData.weather[0].description}</p>
            <p>Temperature: {weatherData.main.temp}K ({(weatherData.main.temp - 273.15).toFixed(2)}°C)</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        ) : (
          <p>Enter a city name and click "Get Weather" <br /> to fetch weather information.</p>
        )}
      </header>
    </div>
  );
}

export default App;
