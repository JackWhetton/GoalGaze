import React from 'react';
import './GoalList.css';

const GoalList = ({ goals, onToggleGoal, onDeleteGoal, onEditGoal }) => {
  if (!goals || goals.length === 0) {
    return (
      <div className="goal-list">
        <h3>Your Goals</h3>
        <div className="no-goals">
          <div className="no-goals-icon">🎯</div>
          <p>No goals yet. Add your first goal above to get started!</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    return due < today;
  };

  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      personal: '👤',
      work: '💼',
      health: '❤️',
      education: '📚',
      finance: '💰',
      relationships: '👥',
      hobbies: '🎨'
    };
    return icons[category] || '📋';
  };

  return (
    <div className="goal-list">
      <h3>Your Goals ({goals.length})</h3>
      <div className="goals-container">
        {goals.map((goal) => {
          const daysUntilDue = getDaysUntilDue(goal.dueDate);
          const overdue = isOverdue(goal.dueDate);
          
          return (
            <div 
              key={goal.id} 
              className={`goal-item ${goal.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}`}
            >
              <div className="goal-header">
                <div className="goal-meta">
                  <span className="priority-indicator" title={`Priority: ${goal.priority}`}>
                    {getPriorityIcon(goal.priority)}
                  </span>
                  <span className="category-indicator" title={`Category: ${goal.category}`}>
                    {getCategoryIcon(goal.category)}
                  </span>
                  <span className="category-text">{goal.category}</span>
                </div>
                <div className="goal-actions">
                  {onEditGoal && (
                    <button 
                      className="edit-button"
                      onClick={() => onEditGoal(goal.id)}
                      title="Edit goal"
                    >
                      ✏️
                    </button>
                  )}
                  {onDeleteGoal && (
                    <button 
                      className="delete-button"
                      onClick={() => onDeleteGoal(goal.id)}
                      title="Delete goal"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>

              <div className="goal-content">
                <div className="goal-checkbox-container">
                  <input
                    type="checkbox"
                    id={`goal-${goal.id}`}
                    checked={goal.completed}
                    onChange={() => onToggleGoal && onToggleGoal(goal.id)}
                    className="goal-checkbox"
                  />
                  <label htmlFor={`goal-${goal.id}`} className="goal-text">
                    {goal.text}
                  </label>
                </div>
              </div>

              <div className="goal-footer">
                <div className="goal-dates">
                  <span className="created-date" title={`Created: ${formatDate(goal.createdAt)}`}>
                    Created {formatDate(goal.createdAt)}
                  </span>
                  {goal.dueDate && (
                    <span className={`due-date ${overdue ? 'overdue' : ''}`}>
                      Due {formatDate(goal.dueDate)}
                      {daysUntilDue !== null && (
                        <span className="days-indicator">
                          {overdue 
                            ? ` (${Math.abs(daysUntilDue)} days overdue)` 
                            : daysUntilDue === 0 
                              ? ' (due today)' 
                              : ` (${daysUntilDue} days left)`
                          }
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </div>

              {goal.completed && (
                <div className="completion-badge">
                  ✅ Completed
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalList;
