import React, { useState, useEffect } from 'react';

// Sample motivational quotes
const quotes = [
  "Patience and perseverance have a magical effect before which difficulties disappear and obstacles vanish.",
  "The way to get started is to quit talking and begin doing.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "Empathy is the best customer service tool you can ever use.",
  "A customer is the most important visitor on our premises, he is not dependent on us; we are dependent on him.",
  "Persistence is very important. You should not give up unless you are forced to give up."
];

const MotivationalQuote = () => {
  const [quote, setQuote] = useState('');
  
  // Get a random quote when the component mounts
  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  // Function to fetch a new quote (if needed)
  const fetchNewQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gradient-to-r from-yellow-300 to-red-300 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-red-700 mb-4">Your Daily Motivation</h2>
      <p className="text-lg font-semibold text-red-800 italic">{quote}</p>
      <button 
        className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
        onClick={fetchNewQuote}
      >
        New Quote
      </button>
    </div>
  );
};

export default MotivationalQuote;
