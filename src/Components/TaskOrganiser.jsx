import React, { useState } from 'react';

const TaskOrganizer = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Respond to client tickets', priority: 'High', status: 'Pending' },
    { id: 2, text: 'Check daily report', priority: 'Medium', status: 'Completed' },
  ]);

  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Low');

  const addTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, text: newTask, priority, status: 'Pending' }]);
    setNewTask('');
  };

  const toggleStatus = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending' } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Task Organizer</h2>
        
        {/* Task Input Section */}
        <div className="flex space-x-4 mb-6">
          <input 
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button 
            className="bg-indigo-500 text-white rounded-lg px-6 py-2 hover:bg-indigo-600 transition"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between bg-gray-50 border-l-4 ${
                task.priority === 'High' ? 'border-red-500' : task.priority === 'Medium' ? 'border-yellow-500' : 'border-green-500'
              } p-4 rounded-lg shadow-sm`}
            >
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{task.text}</h4>
                <p className="text-sm text-gray-600">Priority: {task.priority}</p>
              </div>
              <div>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    task.status === 'Pending' ? 'bg-yellow-500' : 'bg-green-500'
                  } text-white font-semibold transition`}
                  onClick={() => toggleStatus(task.id)}
                >
                  {task.status === 'Pending' ? 'Mark Complete' : 'Completed'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskOrganizer;
