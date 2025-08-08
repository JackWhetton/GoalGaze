import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

// Import your components
import GoalInputForm from './components/GoalInputForm';
import GoalList from './components/GoalList';
import InspirationalImageViewer from './components/InspirationalImageViewer';
import WeatherWidget from './components/WeatherWidget';
import QuoteDisplay from './components/QuoteDisplay';

// Import Redux selectors and actions
import { selectCurrentBackground, loadSavedBackground } from './redux/backgroundSlice';

function App() {
  const dispatch = useDispatch();
  const currentBackground = useSelector(selectCurrentBackground);

  // Load saved background on mount
  useEffect(() => {
    dispatch(loadSavedBackground());
  }, [dispatch]);

  return (
    <div className="App">
      <div id="background-image-container">
        {currentBackground && (
          <img 
            alt="" 
            id="background-image" 
            src={currentBackground.url}
          />
        )}
      </div>
      <header className="App-header">
        <h1>GoalGaze - Motivation App</h1>
        <p>Your productivity companion with weather, quotes, images, and goals!</p>
        
        <QuoteDisplay />
        
        <div className="app-content">
          <div className="left-column">
            <GoalInputForm />
            <InspirationalImageViewer />
          </div>
          <div className="right-column">
            <GoalList />
            <WeatherWidget />
          </div>
        </div>
        
        {/* Uncomment and use your other components when they're implemented */}
        {/* <WeatherWidget /> */}
        
      </header>
    </div>
  );
}

export default App;
