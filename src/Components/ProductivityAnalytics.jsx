import React from 'react';

const ProductivityAnalytics = () => {
  // Example data for analytics
  const analyticsData = {
    tasksCompleted: 58,
    ticketsResolved: 45,
    goalsAchieved: 6,
    streakDays: 4, // Days of consistent productivity
  };

  return (
    <div className="w-full p-6 bg-gradient-to-r from-purple-400 to-blue-400 text-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Productivity Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Task Completion */}
        <div className="bg-purple-600 p-4 rounded-lg shadow-lg hover:bg-purple-700">
          <h3 className="text-xl font-semibold mb-2">Tasks Completed</h3>
          <p className="text-4xl font-bold">{analyticsData.tasksCompleted}</p>
          <p className="text-sm">Tasks completed this week</p>
        </div>
        
        {/* Tickets Resolved */}
        <div className="bg-blue-600 p-4 rounded-lg shadow-lg hover:bg-blue-700">
          <h3 className="text-xl font-semibold mb-2">Tickets Resolved</h3>
          <p className="text-4xl font-bold">{analyticsData.ticketsResolved}</p>
          <p className="text-sm">Customer tickets resolved</p>
        </div>

        {/* Goals Achieved */}
        <div className="bg-indigo-600 p-4 rounded-lg shadow-lg hover:bg-indigo-700">
          <h3 className="text-xl font-semibold mb-2">Goals Achieved</h3>
          <p className="text-4xl font-bold">{analyticsData.goalsAchieved}</p>
          <p className="text-sm">Goals met this week</p>
        </div>
        
        {/* Streaks */}
        <div className="bg-pink-600 p-4 rounded-lg shadow-lg hover:bg-pink-700">
          <h3 className="text-xl font-semibold mb-2">Productivity Streak</h3>
          <p className="text-4xl font-bold">{analyticsData.streakDays}</p>
          <p className="text-sm">Days of consistent productivity</p>
        </div>
      </div>

      {/* Visual progress indicator */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Weekly Progress</h3>
        <div className="h-4 bg-white rounded-full">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${(analyticsData.goalsAchieved / 7) * 100}%` }}
          ></div>
        </div>
        <p className="text-center text-sm mt-2">You've achieved {analyticsData.goalsAchieved} out of 7 goals this week.</p>
      </div>
    </div>
  );
};

export default ProductivityAnalytics;
