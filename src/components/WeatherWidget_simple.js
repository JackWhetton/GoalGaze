import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentWeather } from '../redux/weatherSlice';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const currentWeather = useSelector(selectCurrentWeather);

  // Get weather icon URL
  const getWeatherIconUrl = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  if (!currentWeather) {
    return (
      <div className="weather-widget">
        <div className="weather-header">
          <h3>🌤️ London Weather</h3>
        </div>
        <div className="weather-empty">
          <p>No weather data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <h3>🌤️ London Weather</h3>
      </div>

      <div className="weather-content">
        <div className="weather-main">
          <div className="weather-icon">
            <img 
              src={getWeatherIconUrl(currentWeather.weather[0].icon)} 
              alt={currentWeather.weather[0].description}
            />
          </div>
          <div className="weather-info">
            <div className="temperature">
              {Math.round(currentWeather.main.temp)}°C
            </div>
            <div className="description">
              {currentWeather.weather[0].description}
            </div>
            <div className="location">
              {currentWeather.name}, {currentWeather.sys.country}
            </div>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Feels like</span>
            <span className="detail-value">{Math.round(currentWeather.main.feels_like)}°C</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{currentWeather.main.humidity}%</span>
          </div>
        </div>

        <div className="weather-footer">
          <span className="last-updated">
            Mock data - API requires valid key
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
