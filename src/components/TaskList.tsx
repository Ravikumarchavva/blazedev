import React from 'react';
import { Task } from '@prisma/client';
import TaskCard from './TaskCard';
import { useCurrentRole } from '@/hooks/use-current-role';

interface TaskListProps {
  tasks: Task[];
  updateStatus: (id: string, status: string) => void;
  deleteTask: (id: string) => void;
  handleViewInfoClick: (task: Task) => void;
  title: string;
  bgColor: string;
  textColor: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, updateStatus, deleteTask, handleViewInfoClick, title, bgColor, textColor }) => {
  const role = useCurrentRole();
  return (
    <div className={`${bgColor} p-3 text-center rounded min-h-[30vh]`}>
      <h3 className={`text-lg font-semibold mb-2 ${textColor}`}>{title}</h3>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id}>
            <TaskCard
              task={task}
              updateStatus={updateStatus}
              deleteTask={deleteTask}
              handleViewInfoClick={handleViewInfoClick}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
