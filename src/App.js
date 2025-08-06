import React from 'react';
import './App.css';

// Import your components (you can uncomment these when they're implemented)
// import WeatherWidget from './components/WeatherWidget';
// import QuoteDisplay from './components/QuoteDisplay';
// import InspirationalImageViewer from './components/InspirationalImageViewer';
// import GoalInputForm from './components/GoalInputForm';
// import GoalList from './components/GoalList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GoalGaze - Motivation App</h1>
        <p>Your productivity companion with weather, quotes, images, and goals!</p>
        
        {/* Uncomment and use your components when they're implemented */}
        {/* <WeatherWidget />
        <QuoteDisplay />
        <InspirationalImageViewer />
        <GoalInputForm />
        <GoalList /> */}
        
        <div className="getting-started">
          <h2>Getting Started</h2>
          <ol>
            <li>Set up your API keys in the .env file</li>
            <li>Implement your components in the components folder</li>
            <li>Configure your Redux store and slices</li>
            <li>Start building your motivation app!</li>
          </ol>
        </div>
      </header>
    </div>
  );
}

export default App;
