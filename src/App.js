import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'; // Import Axios

function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/weather') // Use Axios to make the GET request
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        return response.data;
      })
      .then((data) => {
        console.log("data", data, "typeof", typeof data);
        setWeatherData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        {weatherData ? (
          <div>
            <h2>{weatherData.name}</h2>
            <p>{weatherData.weather[0].description}</p>
            <p>Temperature: {weatherData.main.temp}K ({(weatherData.main.temp- 273.15).toFixed(2)}°C) </p>
            <p>Humidity: {weatherData.main.humidity}% </p>
            <p>Wind Speed: {weatherData.wind.speed}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
