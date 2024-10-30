import React from 'react';
import { Task } from '@prisma/client';
import { useCurrentRole } from '@/hooks/use-current-role';

interface TaskCardProps {
  task: Task;
  updateStatus: (id: string, status: string) => void;
  deleteTask: (id: string) => void;
  handleViewInfoClick: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, updateStatus, deleteTask, handleViewInfoClick }) => {
  const role = useCurrentRole();

  return (
    <div className="flex flex-col bg-gray-100 p-2 rounded-md">
      <div className='flex flex-col'>
        <span>{task.title}</span>
        <span className='bg-white/60 text-black rounded font-medium'>Lead: {task.lead}</span>
      </div>
      <div className='flex flex-col gap-2 mt-2'>
        <select
          value={task.status}
          onChange={(e) => updateStatus(task.id, e.target.value)}
          className="border border-gray-300 rounded dark:text-white px-2 py-1 text-sm focus:outline-none"
          disabled={role !== 'ADMIN'}
        >
          <option value="NOTSTARTED">NOTSTARTED</option>
          <option value="INPROGRESS">INPROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        <div className='flex flex-row justify-between'>
          <button
            onClick={() => deleteTask(task.id)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
            disabled={role !== 'ADMIN'}
          >
            Delete
          </button>
          <button
            onClick={() => handleViewInfoClick(task)}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
          >
            View Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
