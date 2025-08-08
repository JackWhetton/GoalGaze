import { createSlice } from '@reduxjs/toolkit';

// Mock data for initial state
const initialState = {
  goals: [
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
  ],
  loading: false,
  error: null
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    // Action to add a new goal
    addGoal: (state, action) => {
      const newGoal = {
        ...action.payload,
        id: Date.now(), // Simple ID generation for mock data
        createdAt: new Date().toISOString()
      };
      state.goals.push(newGoal);
    },
    
    // Action to toggle goal completion
    toggleGoal: (state, action) => {
      const goalId = action.payload;
      const goal = state.goals.find(goal => goal.id === goalId);
      if (goal) {
        goal.completed = !goal.completed;
      }
    },
    
    // Action to delete a goal
    deleteGoal: (state, action) => {
      const goalId = action.payload;
      state.goals = state.goals.filter(goal => goal.id !== goalId);
    },
    
    // Action to edit a goal
    editGoal: (state, action) => {
      const { id, updates } = action.payload;
      const goal = state.goals.find(goal => goal.id === id);
      if (goal) {
        Object.assign(goal, updates);
      }
    },
    
    // Actions for loading states (for future API integration)
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

// Export actions
export const { 
  addGoal, 
  toggleGoal, 
  deleteGoal, 
  editGoal, 
  setLoading, 
  setError 
} = goalsSlice.actions;

// Export selectors
export const selectAllGoals = (state) => state.goals.goals;
export const selectGoalsLoading = (state) => state.goals.loading;
export const selectGoalsError = (state) => state.goals.error;
export const selectGoalById = (state, goalId) => 
  state.goals.goals.find(goal => goal.id === goalId);
export const selectGoalsByCategory = (state, category) =>
  state.goals.goals.filter(goal => goal.category === category);
export const selectCompletedGoals = (state) =>
  state.goals.goals.filter(goal => goal.completed);
export const selectIncompleteGoals = (state) =>
  state.goals.goals.filter(goal => !goal.completed);

// Export reducer
export default goalsSlice.reducer;
