import React, { useState, useEffect } from 'react';
import './App.css';

// Import your components
import GoalInputForm from './components/GoalInputForm';
import GoalList from './components/GoalList';
// import InspirationalImageViewer from './components/InspirationalImageViewer';
// import WeatherWidget from './components/WeatherWidget';
// import QuoteDisplay from './components/QuoteDisplay';

function App() {
  // State for managing goals
  const [goals, setGoals] = useState([
    // Mock data for testing
    {
      id: 1,
      text: "Complete React project for portfolio",
      priority: "high",
      category: "work",
      dueDate: "2025-08-15",
      completed: false,
      createdAt: "2025-08-05T10:00:00.000Z"
    },
    {
      id: 2,
      text: "Exercise 30 minutes daily",
      priority: "medium",
      category: "health",
      dueDate: null,
      completed: true,
      createdAt: "2025-08-01T08:30:00.000Z"
    },
    {
      id: 3,
      text: "Read 1 book per month",
      priority: "low",
      category: "personal",
      dueDate: "2025-08-31",
      completed: false,
      createdAt: "2025-08-03T14:15:00.000Z"
    }
  ]);

  // State for background image
  const [backgroundImage, setBackgroundImage] = useState(null);

  // Set default background image on mount
  useEffect(() => {
    // Check if there's a saved background image
    const savedImage = localStorage.getItem('selectedBackgroundImage');
    if (savedImage) {
      try {
        const parsed = JSON.parse(savedImage);
        setBackgroundImage(parsed.url);
      } catch (error) {
        console.error('Error loading saved image:', error);
        // Fall back to default image
        setBackgroundImage('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
      }
    } else {
      // Set default Mountain Peak image
      setBackgroundImage('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
    }
  }, []);

  // Handler functions for goal management
  const handleAddGoal = (newGoal) => {
    setGoals(prevGoals => [...prevGoals, newGoal]);
  };

  const handleToggleGoal = (goalId) => {
    setGoals(prevGoals => 
      prevGoals.map(goal => 
        goal.id === goalId 
          ? { ...goal, completed: !goal.completed }
          : goal
      )
    );
  };

  const handleDeleteGoal = (goalId) => {
    setGoals(prevGoals => prevGoals.filter(goal => goal.id !== goalId));
  };

  const handleEditGoal = (goalId) => {
    // TODO: Implement edit functionality
    console.log('Edit goal:', goalId);
  };

  // Handler for background image change
  const handleBackgroundChange = (imageUrl) => {
    setBackgroundImage(imageUrl);
  };

  return (
    <div className="App">
      <div id="background-image-container">
        {backgroundImage && (
          <img 
            alt="" 
            id="background-image" 
            src={backgroundImage}
          />
        )}
      </div>
      <header className="App-header">
        <h1>GoalGaze - Motivation App</h1>
        <p>Your productivity companion with weather, quotes, images, and goals!</p>
        
        <div className="app-content">
          <div className="left-column">
            <GoalInputForm onAddGoal={handleAddGoal} />
            {/* <InspirationalImageViewer onBackgroundChange={handleBackgroundChange} /> */}
          </div>
          <div className="right-column">
            <GoalList 
              goals={goals}
              onToggleGoal={handleToggleGoal}
              onDeleteGoal={handleDeleteGoal}
              onEditGoal={handleEditGoal}
            />
          </div>
        </div>
        
        {/* Uncomment and use your other components when they're implemented */}
        {/* <WeatherWidget />
        <QuoteDisplay /> */}
        
      </header>
    </div>
  );
}

export default App;
