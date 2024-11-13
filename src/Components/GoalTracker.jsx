import React, { useState } from 'react';

const GoalTracker = () => {
  // Sample data for goals
  const [goals, setGoals] = useState([
    { id: 1, text: 'Resolve 10 tickets', completed: false },
    { id: 2, text: 'Respond to queries within 5 minutes', completed: true },
    { id: 3, text: 'Follow up on 3 escalated issues', completed: false },
  ]);

  // Function to toggle the goal status
  const toggleGoal = (id) => {
    setGoals(goals.map(goal => goal.id === id ? { ...goal, completed: !goal.completed } : goal));
  };

  // Calculate progress
  const completedGoals = goals.filter(goal => goal.completed).length;
  const progressPercentage = (completedGoals / goals.length) * 100;

  return (
    <div className='flex flex-row'>
    <div className="w-[100%] h-screen  mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Daily Goal Tracker</h1>

      {/* Goals List */}
      <ul className="mb-4">
        {goals.map((goal) => (
          <li key={goal.id} className="flex justify-between items-center bg-white p-4 mb-2 rounded-lg shadow-md">
            <span className={`text-lg ${goal.completed ? 'line-through text-gray-400' : 'text-blue-700'}`}>
              {goal.text}
            </span>
            <button
              onClick={() => toggleGoal(goal.id)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                goal.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
            >
              {goal.completed ? 'Completed' : 'Mark as Done'}
            </button>
          </li>
        ))}
      </ul>

      {/* Progress Bar */}
      <div>
        <h2 className="text-lg font-medium text-blue-700 mb-2">Progress</h2>
        <div className="w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-blue-700 mt-2">{completedGoals} of {goals.length} goals completed</p>
      </div>

      {/* Motivational Section */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-bold text-blue-600">Stay Motivated!</h3>
        <p className="text-blue-500">
          "Success is the sum of small efforts, repeated day in and day out." – Robert Collier
        </p>
      </div>
    </div>
    </div>
  );
};

export default GoalTracker;
