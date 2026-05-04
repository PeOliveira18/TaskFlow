import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskStatus, TaskPriority } from '../types/task';
import { loadTasks, saveTasks } from '../services/taskStorage';
import { generateId } from '../utils/generateId';

interface NewTask {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  categoryIcon: string;
}

interface TaskContextData {
  tasks: Task[];
  loading: boolean;
  addTask: (data: NewTask) => Promise<void>;
  updateTask: (id: string, data: Partial<NewTask>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTask: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasksFromStorage();
  }, []);

  async function loadTasksFromStorage() {
    const savedTasks = await loadTasks();
    setTasks(savedTasks);
    setLoading(false);
  }

  async function addTask(data: NewTask) {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: generateId(),
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      category: data.category,
      categoryIcon: data.categoryIcon,
      createdAt: now,
      updatedAt: now,
    };
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  }

  async function updateTask(id: string, data: Partial<NewTask>) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          ...data,
          updatedAt: new Date().toISOString(),
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  }

  async function deleteTask(id: string) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  }

  function getTask(id: string) {
    return tasks.find((task) => task.id === id);
  }

  return (
    <TaskContext.Provider value={{ tasks, loading, addTask, updateTask, deleteTask, getTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}
