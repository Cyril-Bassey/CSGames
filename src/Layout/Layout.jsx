import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 via-white to-pink-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-r from-indigo-700 to-purple-700 text-white h-auto shadow-lg">
        <nav className="flex flex-col p-4 space-y-8 mt-20">
            <div>
                <h1 className='text-2xl text-center'>WELCOME</h1>
            </div>
          <Link
            to="/"
            className="py-3 px-5 bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-all text-center"
          >
            🏠 Dashboard
          </Link>
          <Link
            to="/taskorganizer"
            className="py-3 px-5 bg-purple-500 hover:bg-purple-600 rounded-lg transition-all text-center"
          >
            📋 Task Organizer
          </Link>
          <Link
            to="/goaltracker"
            className="py-3 px-5 bg-pink-500 hover:bg-pink-600 rounded-lg transition-all text-center"
          >
            🎯 Goal Tracker
          </Link>
          <Link
            to="/game"
            className="py-3 px-5 bg-green-500 hover:bg-green-600 rounded-lg transition-all text-center"
          >
            🎮 Game
          </Link>
          <Link
            to="/quotes"
            className="py-3 px-5 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-all text-center"
          >
            💡 Quotes
          </Link>
          <Link
            to="/analytics"
            className="py-3 px-5 bg-red-500 hover:bg-red-600 rounded-lg transition-all text-center"
          >
            📊 Analytics
          </Link>
          <Link
            to="/break"
            className="py-3 px-5 bg-red-500 hover:bg-red-600 rounded-lg transition-all text-center"
          >
            📊 Break Reminders
          </Link>
          <Link
            to="/reward"
            className="py-3 px-5 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all text-center"
          >
            🏆 Rewards
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Navbar */}
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 shadow-md text-center">
          <h1 className="text-2xl font-bold">Welcome to Your Productivity Hub!</h1>
        </header>

        {/* Dynamic content from the selected route */}
        <main className="p-8 bg-white rounded-xl shadow-lg mt-6 mx-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
