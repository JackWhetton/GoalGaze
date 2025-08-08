import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGoal } from '../redux/goalsSlice';
import './GoalInputForm.css';

const GoalInputForm = () => {
  const dispatch = useDispatch();
  const [goalText, setGoalText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('personal');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});

  // Validate form input
  const validateForm = () => {
    const newErrors = {};

    if (!goalText.trim()) {
      newErrors.goalText = 'Goal description is required';
    } else if (goalText.trim().length < 3) {
      newErrors.goalText = 'Goal must be at least 3 characters long';
    } else if (goalText.trim().length > 200) {
      newErrors.goalText = 'Goal must be less than 200 characters';
    }

    if (dueDate) {
      const selectedDate = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newGoal = {
      id: Date.now(), // Simple ID generation - in real app, use proper UUID
      text: goalText.trim(),
      priority,
      category,
      dueDate: dueDate || null,
      completed: false
    };

    // Dispatch action to add goal to Redux store
    dispatch(addGoal(newGoal));

    // Reset form
    setGoalText('');
    setPriority('medium');
    setCategory('personal');
    setDueDate('');
    setErrors({});
  };

  const handleGoalTextChange = (e) => {
    setGoalText(e.target.value);
    // Clear error when user starts typing
    if (errors.goalText) {
      setErrors(prev => ({ ...prev, goalText: '' }));
    }
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
    // Clear error when user changes date
    if (errors.dueDate) {
      setErrors(prev => ({ ...prev, dueDate: '' }));
    }
  };

  return (
    <div className="goal-input-form">
      <h3>Add New Goal</h3>
      <form onSubmit={handleSubmit} className="goal-form">
        <div className="form-group">
          <label htmlFor="goalText">Goal Description *</label>
          <textarea
            id="goalText"
            value={goalText}
            onChange={handleGoalTextChange}
            placeholder="What do you want to achieve?"
            className={`goal-textarea ${errors.goalText ? 'error' : ''}`}
            rows={3}
            maxLength={200}
          />
          {errors.goalText && <span className="error-message">{errors.goalText}</span>}
          <div className="character-count">
            {goalText.length}/200
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="form-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group half">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
              <option value="finance">Finance</option>
              <option value="relationships">Relationships</option>
              <option value="hobbies">Hobbies</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date (Optional)</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={handleDueDateChange}
            className={`form-input ${errors.dueDate ? 'error' : ''}`}
            min={new Date().toISOString().split('T')[0]} // Prevent past dates
          />
          {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={!goalText.trim()}
        >
          Add Goal
        </button>
      </form>
    </div>
  );
};

export default GoalInputForm;
