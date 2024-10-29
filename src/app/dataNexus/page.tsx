'use client';
// components/TodoList.js
import { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Set up event venue', status: 'Not Started' },
    { id: 2, title: 'Confirm guest list', status: 'In Progress' },
    { id: 3, title: 'Design marketing material', status: 'Completed' },
  ]);
  
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Update task status
  const updateStatus = (id: number, status: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status } : task));
  };

  // Add a new task
  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now(), // Unique ID based on timestamp
        title: newTaskTitle,
        status: 'Not Started'
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle(''); // Clear the input after adding
    }
  };

  // Delete a task
  const deleteTask = (id:number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Separate tasks by status
  const notStartedTasks = tasks.filter(task => task.status === 'Not Started');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const completedTasks = tasks.filter(task => task.status === 'Completed');
  
  return (
    <div className="w-[90vw] min-h-[80vh] mb-[5vw] py-[5vw] mx-[5vw] px-[2vw] bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">To-Do List</h2>

      {/* Add Task Form */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
          className="flex-1 border border-gray-300 rounded px-2 py-1 mr-2 text-sm focus:outline-none"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-gray-200 p-3 rounded text-center">
          <h3 className="font-medium">Total Tasks</h3>
          <p className="text-xl font-bold">{tasks.length}</p>
        </div>
        <div className="bg-gray-200 p-3 rounded text-center">
          <h3 className="font-medium">Not Started</h3>
          <p className="text-xl font-bold">{notStartedTasks.length}</p>
        </div>
        <div className="bg-gray-200 p-3 rounded text-center">
          <h3 className="font-medium">In Progress</h3>
          <p className="text-xl font-bold">{inProgressTasks.length}</p>
        </div>
        <div className="bg-gray-200 p-3 rounded text-center">
          <h3 className="font-medium">Completed</h3>
          <p className="text-xl font-bold">{completedTasks.length}</p>
        </div>
      </div>

      {/* Task Lists */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-200 p-3 rounded text-center">
            <h3 className="font-medium">Total Tasks</h3>
            <ul className="space-y-2">
                {tasks.map(task => (
                    <li key={task.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                    <span>{task.title}</span>
                    <select
                        value={task.status}
                        onChange={(e) => updateStatus(task.id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none mr-2"
                    >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button
                        onClick={() => deleteTask(task.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    >
                        Delete
                    </button>
                    </li>
                ))}
            </ul>
        </div>
        {/* Not Started Tasks */}
        <div className='bg-destructive/60 p-3 text-center rounded'>
          <h3 className="text-lg font-semibold mb-2">Not Started</h3>
          <ul className="space-y-2">
            {notStartedTasks.map(task => (
              <li key={task.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                <span>{task.title}</span>
                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task.id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none mr-2"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* In Progress Tasks */}
        <div className='bg-amber-600 p-3 text-center rounded'>
          <h3 className="text-lg font-semibold mb-2">In Progress</h3>
          <ul className="space-y-2">
            {inProgressTasks.map(task => (
              <li key={task.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                <span>{task.title}</span>
                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task.id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none mr-2"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Completed Tasks */}
        <div className='bg-green-400 p-3 text-center rounded'>
          <h3 className="text-lg font-semibold mb-2">Completed</h3>
          <ul className="space-y-2">
            {completedTasks.map(task => (
              <li key={task.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                <span>{task.title}</span>
                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task.id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none mr-2"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
