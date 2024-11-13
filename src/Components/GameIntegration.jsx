import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import './styles.css'; // Ensure this file has game-related styles like background, etc.

const PuzzleMatchGame = () => {
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const [playsLeft, setPlaysLeft] = useState(3); // 3 plays per day
  const [isGameActive, setIsGameActive] = useState(false);

  const [issues] = useState([
    { id: 'card1', text: '7 of Clubs' },
    { id: 'card2', text: 'King of Clubs' },
    { id: 'card3', text: '9 of Clubs' },
  ]);

  const [solutions] = useState([
    { id: 'solution1', text: 'Jack of Hearts' },
    { id: 'solution2', text: '5 of Spades' },
    { id: 'solution3', text: '4 of Hearts' },
  ]);

  const [shuffledSolutions, setShuffledSolutions] = useState([]);

  useEffect(() => {
    setShuffledSolutions([...solutions].sort(() => Math.random() - 0.5));
  }, [solutions]);

  useEffect(() => {
    let timer;
    if (isGameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setIsGameActive(false);
    }
    return () => clearTimeout(timer);
  }, [isGameActive, timeLeft]);

  const startGame = () => {
    if (playsLeft > 0) {
      setIsGameActive(true);
      setTimeLeft(60);
      setPlaysLeft(playsLeft - 1);
    }
  };

const onDragEnd = (result) => {
  if (!result.destination) return;

  const { source, destination } = result;

  if (source.droppableId === 'solutionsArea') {
    const newShuffledSolutions = Array.from(shuffledSolutions);
    const [reorderedItem] = newShuffledSolutions.splice(source.index, 1);
    newShuffledSolutions.splice(destination.index, 0, reorderedItem);

    setShuffledSolutions(newShuffledSolutions);
  } else {
    // Handle dropping on an issue
    const solutionId = result.draggableId;
    const issueId = destination.droppableId;

    const matchedIssue = issues.find(issue => issue.id === issueId);
    if (matchedIssue && matchedIssue.correctSolution === solutionId) {
      alert('Correct Match!');
      // Here you could update the state to reflect the correct match
    } else {
      alert('Wrong Match! Try Again.');
    }
  }
};
  return (
    <div className="game-container h-screen w-full bg-gradient-to-br from-blue-900 to-green-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold text-center mb-8">CS Puzzle Match Game</h1>

      {/* Game Controls */}
      <div className="flex justify-between items-center w-full px-8 mb-4 max-w-4xl">
        <div className="text-left">
          <p className="text-xl">Time Left: {timeLeft}s</p>
          <p className="text-xl">Plays Left Today: {playsLeft}</p>
        </div>
        <button
          className={`px-6 py-3 rounded-lg font-bold ${playsLeft > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          onClick={startGame}
          disabled={playsLeft === 0 || isGameActive}
        >
          {isGameActive ? 'Game In Progress' : 'Start Game'}
        </button>
      </div>

      {/* Game Board */}
      {isGameActive && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="game-board w-full max-w-6xl grid grid-cols-7 gap-6 px-8">
            {/* Issues (Droppable columns) */}
            {issues.map((issue, index) => (
              <Droppable key={issue.id} droppableId={issue.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="issue-column h-80 bg-blue-500 bg-opacity-50 rounded-lg p-4 flex flex-col space-y-2"
                  >
                    <h2 className="text-xl mb-4">{issue.text}</h2>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}

            {/* Shuffled Solutions (Draggable cards) */}
            {shuffledSolutions.map((solution, index) => (
              <Droppable key={`sol-${solution.id}`} droppableId={solution.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="solution-column flex flex-col items-center"
                  >
                    <Draggable key={solution.id} draggableId={solution.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="card bg-green-600 w-32 h-48 flex items-center justify-center text-xl rounded-lg shadow-lg cursor-pointer"
                        >
                          {solution.text}
                        </div>
                      )}
                    </Draggable>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}

      {/* Game Over Message */}
      {!isGameActive && playsLeft === 0 && (
        <div className="mt-6 bg-blue-50 p-4 rounded-lg text-center">
          <h3 className="text-lg font-bold text-blue-600">No more plays left today! Come back tomorrow for a break.</h3>
        </div>
      )}

      {/* Motivational Message */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg text-center text-blue-600 max-w-lg mx-auto">
        <h3 className="text-lg font-bold">Take a Mental Break!</h3>
        <p>Solving puzzles can help refresh your mind before getting back to customer issues. Great job taking a break!</p>
      </div>
    </div>
  );
};

export default PuzzleMatchGame;
