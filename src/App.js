import React, { useState } from 'react';
import './App.css';

// Import your components
import GoalInputForm from './components/GoalInputForm';
import GoalList from './components/GoalList';
// import WeatherWidget from './components/WeatherWidget';
// import QuoteDisplay from './components/QuoteDisplay';
// import InspirationalImageViewer from './components/InspirationalImageViewer';

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>GoalGaze - Motivation App</h1>
        <p>Your productivity companion with weather, quotes, images, and goals!</p>
        
        <div className="app-content">
          <GoalInputForm onAddGoal={handleAddGoal} />
          <GoalList 
            goals={goals}
            onToggleGoal={handleToggleGoal}
            onDeleteGoal={handleDeleteGoal}
            onEditGoal={handleEditGoal}
          />
        </div>
        
        {/* Uncomment and use your other components when they're implemented */}
        {/* <WeatherWidget />
        <QuoteDisplay />
        <InspirationalImageViewer /> */}
        
      </header>
    </div>
  );
}

export default App;
