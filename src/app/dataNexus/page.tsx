'use client';
import { taskSchema } from '@/models/schemas';
import { useState, useEffect } from 'react';
import { z } from 'zod';

type Task = z.infer<typeof taskSchema>;

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskLead, setNewTaskLead] = useState('');

  // Fetch tasks from the database
  const getTasks = async () => {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    setTasks(tasks);
  };

  useEffect(() => {
    getTasks();
  }, []);

  // Update task status
  const updateStatus = async (id: number, status: string) => {
    const response = await fetch('/api/tasks', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status }),
    });
    const updatedTask = await response.json();
    if (response.ok) {
      setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
    }
  };

  // Add a new task
  const addTask = async () => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTaskTitle, lead: newTaskLead }),
    });
    const newTask = await response.json();
    if (response.ok) {
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskLead('');
    }
  };

  // Delete a task
  const deleteTask = async (id: number) => {
    const response = await fetch('/api/tasks', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  // Separate tasks by status
  const notStartedTasks = tasks.filter(task => task.status === 'Not Started');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const completedTasks = tasks.filter(task => task.status === 'Completed');

  return (
    <div className='w-[90vw] mb-[5vw] py-[5vw] mx-[5vw]'>
      <div className="lg:max-w-full h-full px-2 min-h-[70vh] bg-primary shadow-lg rounded-lg py-[2vh] portrait:max-w-[450px] md:max-w-[600px] mx-auto">
        <h2 className="text-3xl text-white font-semibold text-center mb-6">To-Do List</h2>

        {/* Add Task Form */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="New task title"
            className="flex-1 border border-gray-300 bg-white rounded px-2 py-1 mr-2 text-sm focus:outline-none"
          />
          <input
            type="text"
            value={newTaskLead}
            onChange={(e) => setNewTaskLead(e.target.value)}
            placeholder="Task lead"
            className="flex-1 border border-gray-300 bg-white rounded px-2 py-1 mr-2 text-sm focus:outline-none"
          />
          <button
            onClick={addTask}
            className="bg-secondary text-white px-3 py-1 rounded hover:bg-secondary/80 transition"
          >
            Add Task
          </button>
        </div>

        {/* Task Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-4 text-black">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 text-black">
          <div className="bg-gray-200 p-3 rounded text-center min-h-[30vh]">
            <h3 className="font-medium">Total Tasks</h3>
            <ul className="space-y-2">
              {tasks.map(task => (
                <li key={task.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                  <div className='flex flex-col'>
                    <span>{task.title}</span>
                    <span className='bg-white/60 text-black rounded font-medium'>Lead: {task.lead}</span>
                  </div>
                  <div className='flex items-center'>
                    <select
                      value={task.status}
                      onChange={(e) => updateStatus(task.id, e.target.value)}
                      className="border border-gray-300 dark:text-white rounded px-2 py-1 text-sm focus:outline-none mr-2"
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
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Not Started Tasks */}
          <div className='bg-destructive/60 p-3 text-center rounded min-h-[30vh]'>
            <h3 className="text-lg font-semibold mb-2 text-white">Not Started</h3>
            <div>
              <ul className="space-y-2">
                {notStartedTasks.map(task => (
                  <li key={task.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                    <div className='flex flex-col'>
                      <span>{task.title}</span>
                      <span className='bg-white/60 text-black rounded font-medium'>Lead: {task.lead}</span>
                    </div>
                    <div className='flex items-center'>
                      <select
                        value={task.status}
                        onChange={(e) => updateStatus(task.id, e.target.value)}
                        className="border border-gray-300 dark:text-white rounded px-2 py-1 text-sm focus:outline-none mr-2"
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
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* In Progress Tasks */}
          <div className='bg-amber-600 p-3 text-center rounded min-h-[30vh]'>
            <h3 className="text-lg font-semibold mb-2 text-white">In Progress</h3>
            <ul className="space-y-2">
              {inProgressTasks.map(task => (
                <li key={task.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                  <div className='flex flex-col'>
                    <span>{task.title}</span>
                    <span className='bg-white/60 text-black rounded font-medium'>Lead: {task.lead}</span>
                  </div>
                  <div className='flex items-center'>
                    <select
                      value={task.status}
                      onChange={(e) => updateStatus(task.id, e.target.value)}
                      className="border border-gray-300 rounded dark:text-white px-2 py-1 text-sm focus:outline-none mr-2"
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
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Completed Tasks */}
          <div className='bg-green-400 p-3 text-center rounded min-h-[30vh]'>
            <h3 className="text-lg font-semibold mb-2 text-white">Completed</h3>
            <ul className="space-y-2">
              {completedTasks.map(task => (
                <li key={task.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                  <div className='flex flex-col'>
                    <span>{task.title}</span>
                    <span className='bg-white/60 text-black rounded font-medium'>Lead: {task.lead}</span>
                  </div>
                  <div className='flex items-center'>
                    <select
                      value={task.status}
                      onChange={(e) => updateStatus(task.id, e.target.value)}
                      className="border border-gray-300 rounded dark:text-white px-2 py-1 text-sm focus:outline-none mr-2"
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
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;