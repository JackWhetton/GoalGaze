import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY || 'd0ee07b05153f43229d82066857c2665';
const BASE_URL = process.env.REACT_APP_WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5';

// Async thunk for fetching weather by coordinates
export const fetchWeatherByCoords = createAsyncThunk(
  'weather/fetchByCoords',
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching weather by city name
export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchByCity',
  async (cityName, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching current location
export const fetchCurrentLocation = createAsyncThunk(
  'weather/fetchCurrentLocation',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          enableHighAccuracy: true,
          maximumAge: 300000 // 5 minutes
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Fetch weather data with the coordinates
      const weatherAction = await dispatch(fetchWeatherByCoords({ 
        lat: latitude, 
        lon: longitude 
      }));
      
      return {
        coords: { lat: latitude, lon: longitude },
        weather: weatherAction.payload
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state with mock data for development
const initialState = {
  currentWeather: {
    // Mock data for London
    name: 'London',
    main: {
      temp: 18,
      feels_like: 20,
      humidity: 72,
      pressure: 1015
    },
    weather: [{
      main: 'Clouds',
      description: 'partly cloudy',
      icon: '02d'
    }],
    wind: {
      speed: 2.1
    },
    sys: {
      country: 'GB'
    }
  },
  location: {
    lat: null,
    lon: null,
    city: 'London'
  },
  loading: false,
  error: null,
  lastUpdated: null,
  isUsingCurrentLocation: false
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    // Action to clear weather data
    clearWeather: (state) => {
      state.currentWeather = null;
      state.error = null;
    },
    
    // Action to clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Action to set location manually
    setLocation: (state, action) => {
      state.location = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchWeatherByCoords
      .addCase(fetchWeatherByCoords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload;
        state.lastUpdated = new Date().toISOString();
        state.location.lat = action.payload.coord.lat;
        state.location.lon = action.payload.coord.lon;
        state.location.city = action.payload.name;
      })
      .addCase(fetchWeatherByCoords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle fetchWeatherByCity
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload;
        state.lastUpdated = new Date().toISOString();
        state.location.lat = action.payload.coord.lat;
        state.location.lon = action.payload.coord.lon;
        state.location.city = action.payload.name;
        state.isUsingCurrentLocation = false;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle fetchCurrentLocation
      .addCase(fetchCurrentLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.location.lat = action.payload.coords.lat;
        state.location.lon = action.payload.coords.lon;
        state.isUsingCurrentLocation = true;
        // Weather data is handled by fetchWeatherByCoords
      })
      .addCase(fetchCurrentLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isUsingCurrentLocation = false;
      });
  }
});

// Export actions
export const { clearWeather, clearError, setLocation } = weatherSlice.actions;

// Export selectors
export const selectCurrentWeather = (state) => state.weather.currentWeather;
export const selectWeatherLoading = (state) => state.weather.loading;
export const selectWeatherError = (state) => state.weather.error;
export const selectLocation = (state) => state.weather.location;
export const selectLastUpdated = (state) => state.weather.lastUpdated;
export const selectIsUsingCurrentLocation = (state) => state.weather.isUsingCurrentLocation;

// Export reducer
export default weatherSlice.reducer;
