import React, { useEffect, useRef, useState } from "react";
import "./weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [searchHistory, setSearchHistory] = useState([]); 

  const allIcons = {
    "Partly cloudy": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `http://api.weatherapi.com/v1/current.json?key=70bbcece4d9c4a81b1e102148240709&q=${city}`;
      const response = await fetch(url);
      const data = await response.json();
      const icons = allIcons[data.current.condition.text] || clear_icon;

      const newWeatherData = {
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        temperature: Math.floor(data.current.temp_c),
        location: data.location.name,
        icon: icons,
      };

      setSearchHistory((prevHistory) => [newWeatherData, ...prevHistory]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search("karachi");
  }, []);

  return (
    <>
      <div className="weather-search">
        <div className="search-bar">
          <input ref={inputRef} type="text" placeholder="Search" />
          <img
            src={search_icon}
            alt=""
            onClick={() => search(inputRef.current.value)}
          />
        </div>
      </div>

      <div className="weather-results">
        {searchHistory.map((weatherData, index) => (
          <div key={index} className="weather">
            {/* <img src={weatherData.icon} alt="" className="weather-icon" /> */}
            <p className="temperature">{weatherData.temperature}°C</p>
            <p className="location">{weatherData.location}</p>
            <div className="weather-data">
              <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                  <p>{weatherData.windSpeed} kph</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Weather;
