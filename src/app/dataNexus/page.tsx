"use client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import TaskList from "@/components/TaskList";
import { z } from "zod";
import { statusSchema, taskSchema } from "@/models/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";

type Status = z.infer<typeof statusSchema>;
type Task = z.infer<typeof taskSchema>;

//code for retry
const retry = async (fn: () => Promise<any>, retries = 3): Promise<any> => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
    }
  }
};

const DataNexus = () => {
  const role = useCurrentRole();
  const user = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskLead, setNewTaskLead] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editedDescription, setEditedDescription] = useState<string>("");

  const getTasks = async () => {
    try {
      const response = await retry(() =>
        fetch("/api/tasks", { method: "GET" }),
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const tasks = await response.json();
      if (!Array.isArray(tasks)) {
        throw new Error("Invalid data format");
      }
      tasks.forEach((task) => taskSchema.parse(task)); // Validate each task
      setTasks(tasks);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      statusSchema.parse(status); // Validate status
      const response = await retry(() =>
        fetch("/api/tasks", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, status }),
        }),
      );
      if (!response.ok) {
        throw new Error("Failed to update task status");
      }
      const updatedTask = await response.json();
      taskSchema.parse(updatedTask); // Validate updated task
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const addTask = async () => {
    if (role !== "ADMIN") {
      toast("You need admin privileges to add a task.");
      return;
    }
    try {
      const newTask = {
        title: newTaskTitle,
        lead: newTaskLead,
        description: newTaskDescription,
        status: "NOTSTARTED",
      };
      taskSchema.omit({ id: true }).parse(newTask); // Validate new task without id
      const response = await retry(() =>
        fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        }),
      );
      if (!response.ok) throw new Error("Failed to add task");
      const addedTask = await response.json();
      taskSchema.parse(addedTask); // Validate added task
      setTasks([...tasks, addedTask]);
      setNewTaskTitle("");
      setNewTaskLead("");
      setNewTaskDescription("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await retry(() =>
        fetch("/api/tasks", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }),
      );
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleViewInfoClick = (task: Task) => {
    setSelectedTask(task);
    setEditedDescription(task.description || "");
  };

  const closeDialog = () => {
    setSelectedTask(null);
  };

  const updateDescription = async () => {
    if (!selectedTask) return;
    try {
      const response = await retry(() =>
        fetch("/api/tasks", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: selectedTask.id,
            description: editedDescription,
          }),
        }),
      );
      if (!response.ok) {
        throw new Error("Failed to update task description");
      }
      const updatedTask = await response.json();
      taskSchema.parse(updatedTask); // Validate updated task
      setTasks(
        tasks.map((task) => (task.id === selectedTask.id ? updatedTask : task)),
      );
      closeDialog();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const notStartedTasks = tasks.filter((task) => task.status === "NOTSTARTED");
  const inProgressTasks = tasks.filter((task) => task.status === "INPROGRESS");
  const completedTasks = tasks.filter((task) => task.status === "COMPLETED");

  return (
    <div className="w-[90vw] mb-[5vw] py-[5vw] mx-[5vw]">
      <div className="lg:max-w-full h-full px-2 min-h-[70vh] bg-primary shadow-lg rounded-lg py-[50px] md:max-w-[70vw] mx-auto">
        <h2 className="text-3xl text-white font-semibold text-center mb-6">
          To-Do List
        </h2>
        <h3 className="text-xl text-white font-semibold text-center mb-4">
          {role === "ADMIN" ? "(ADMIN)" : "You are not admin"} {user?.name}
        </h3>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="flex flex-col sm:flex-row items-center mb-6 space-y-2 sm:space-y-0 sm:space-x-2 text-black">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="New task title"
            className="flex-1 border border-gray-300 bg-white rounded px-2 py-1 text-sm focus:outline-none w-full sm:w-auto"
          />
          <input
            type="text"
            value={newTaskLead}
            onChange={(e) => setNewTaskLead(e.target.value)}
            placeholder="Task lead"
            className="flex-1 border border-gray-300 bg-white rounded px-2 py-1 text-sm focus:outline-none w-full sm:w-auto"
          />
          <input
            type="text"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Task description"
            className="flex-1 border border-gray-300 bg-white rounded px-2 py-1 text-sm focus:outline-none w-full sm:w-auto"
          />
          <button
            onClick={addTask}
            className="bg-secondary text-white px-3 py-1 rounded hover:bg-secondary/80 transition w-full sm:w-auto"
          >
            Add Task
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-4 text-black">
          <div className="bg-gray-200 p-3 rounded text-center">
            <h3 className="font-medium">Total Tasks</h3>
            <p className="text-xl font-bold">{tasks.length}</p>
          </div>
          <div className="bg-gray-200 p-3 rounded text-center">
            <h3 className="font-medium">NOTSTARTED</h3>
            <p className="text-xl font-bold">{notStartedTasks.length}</p>
          </div>
          <div className="bg-gray-200 p-3 rounded text-center">
            <h3 className="font-medium">INPROGRESS</h3>
            <p className="text-xl font-bold">{inProgressTasks.length}</p>
          </div>
          <div className="bg-gray-200 p-3 rounded text-center">
            <h3 className="font-medium">COMPLETED</h3>
            <p className="text-xl font-bold">{completedTasks.length}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 text-black">
          <TaskList
            tasks={tasks}
            updateStatus={updateStatus}
            deleteTask={deleteTask}
            handleViewInfoClick={handleViewInfoClick}
            title="Total Tasks"
            bgColor="bg-gray-200"
            textColor="text-black"
          />
          <TaskList
            tasks={notStartedTasks}
            updateStatus={updateStatus}
            deleteTask={deleteTask}
            handleViewInfoClick={handleViewInfoClick}
            title="NOTSTARTED"
            bgColor="bg-red-500"
            textColor="text-white"
          />
          <TaskList
            tasks={inProgressTasks}
            updateStatus={updateStatus}
            deleteTask={deleteTask}
            handleViewInfoClick={handleViewInfoClick}
            title="INPROGRESS"
            bgColor="bg-orange-500"
            textColor="text-white"
          />
          <TaskList
            tasks={completedTasks}
            updateStatus={updateStatus}
            deleteTask={deleteTask}
            handleViewInfoClick={handleViewInfoClick}
            title="COMPLETED"
            bgColor="bg-green-500"
            textColor="text-white"
          />
        </div>
        {selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90vw] md:w-[50vw] p-6 relative">
              <h3 className="text-2xl font-semibold mb-4">
                {selectedTask.title}
              </h3>
              <div className="mb-4">
                <p className="text-lg">
                  <strong>Lead:</strong> {selectedTask.lead}
                </p>
                {role === "ADMIN" ? (
                  <>
                    <label
                      htmlFor="description"
                      className="block text-lg font-medium mb-2"
                    >
                      <strong>Description:</strong>
                    </label>
                    <textarea
                      id="description"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </>
                ) : (
                  <div className="text-lg text-black">
                    <h2 className="font-semibold">
                      <strong>Title:</strong> {selectedTask.title}
                    </h2>
                    <h2 className="font-semibold">
                      <strong>Description:</strong> {selectedTask.description}
                    </h2>
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                {role === "ADMIN" && (
                  <button
                    onClick={updateDescription}
                    className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/80 transition"
                  >
                    Save
                  </button>
                )}
                <button
                  onClick={closeDialog}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataNexus;
