import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentWeather,
  selectWeatherLoading,
  selectWeatherError,
  selectLastUpdated,
  selectIsUsingCurrentLocation,
  fetchWeatherByCity,
  fetchCurrentLocation,
  clearError
} from '../redux/weatherSlice';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const dispatch = useDispatch();
  const currentWeather = useSelector(selectCurrentWeather);
  const loading = useSelector(selectWeatherLoading);
  const error = useSelector(selectWeatherError);
  const lastUpdated = useSelector(selectLastUpdated);
  const isUsingCurrentLocation = useSelector(selectIsUsingCurrentLocation);

  // For now, we'll just show the mock London data
  // To enable API calls, get a valid API key from openweathermap.org
  // and uncomment the useEffect below:
  
  // useEffect(() => {
  //   dispatch(fetchWeatherByCity('London'));
  // }, [dispatch]);

  // Handle current location (disabled for now due to API key issues)
  const handleCurrentLocation = () => {
    // dispatch(fetchCurrentLocation());
    console.log('API calls disabled - need valid API key');
  };

  // Get weather icon URL
  const getWeatherIconUrl = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  // Format last updated time
  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (loading) {
    return (
      <div className="weather-widget">
        <div className="weather-header">
          <h3>🌤️ London Weather</h3>
        </div>
        <div className="weather-loading">
          <div className="loading-spinner"></div>
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  // For now, skip error display and just show the mock data
  // if (error) { ... }

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

        {lastUpdated && (
          <div className="weather-footer">
            <span className="last-updated">
              Updated: {formatLastUpdated(lastUpdated)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
