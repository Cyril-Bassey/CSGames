import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import TaskOrganizer from './Components/TaskOrganiser'; 
// import GoalTracker from './Components/GoalTracker';
// import PuzzleMatchGame from './Components/GameIntegration';
// import MotivationalQuote from './Components/MotivationalQuotes';
// import ProductivityAnalytics from './Components/ProductivityAnalytics';
// import RewardSystem from './Components/RewardsSystem';
// import Layout from './Layout/Layout';
import BreakReminders from './Components/BreakReminders';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<BreakReminders />} />
        {/* Layout component wraps the routes to preserve the sidebar */}
        {/* <Route path="/" element={<Layout />}> */}
          {/* Nested routes for different components */}
          {/* <Route path="/taskorganizer" element={<TaskOrganizer />} /> */}
          {/* <Route path="/goaltracker" element={<GoalTracker />} /> */}
          {/* <Route path="/game" element={<PuzzleMatchGame />} /> */}
          {/* <Route path="/quotes" element={<MotivationalQuote />} />
          <Route path="/analytics" element={<ProductivityAnalytics />} />
          <Route path="/reward" element={<RewardSystem />} />
          <Route path="/break" element={<BreakReminders />} /> */}
        {/* </Route>   */}
      </Routes>
    </Router>
  );
}

export default App;
