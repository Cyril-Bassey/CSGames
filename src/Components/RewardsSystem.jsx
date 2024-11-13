import React from 'react';

// Mock data for rewards and milestones
const rewardsData = [
  {
    name: '50 Tickets Master',
    description: 'Resolve 50 tickets to unlock this badge',
    unlocked: true,
    icon: '🎖️',
  },
  {
    name: 'Task Completion Pro',
    description: 'Complete all daily tasks for 7 consecutive days',
    unlocked: true,
    icon: '🏆',
  },
  {
    name: '100 Tickets Expert',
    description: 'Resolve 100 tickets to unlock this badge',
    unlocked: false,
    icon: '💼',
  },
  {
    name: 'Goal Streak Legend',
    description: 'Achieve all daily goals for 14 days in a row',
    unlocked: false,
    icon: '🔥',
  },
];

const RewardSystem = () => {
  return (
    <div className="w-full p-6 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Reward System</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rewardsData.map((reward, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ${
              reward.unlocked ? 'bg-yellow-500' : 'bg-gray-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl">{reward.icon}</span>
              <h3 className="text-xl font-semibold">{reward.name}</h3>
            </div>
            <p className="text-sm mt-2">{reward.description}</p>
            {reward.unlocked ? (
              <p className="mt-4 text-green-200">Unlocked 🎉</p>
            ) : (
              <p className="mt-4 text-red-200">Locked 🔒</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold mb-4">Next Rewards</h3>
        <p>Keep working on your goals to unlock more achievements!</p>
      </div>
    </div>
  );
};

export default RewardSystem;
