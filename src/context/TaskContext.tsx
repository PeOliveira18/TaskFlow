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
    loadTasks().then((data) => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  async function addTask(data: NewTask): Promise<void> {
    const now = new Date().toISOString();
    const task: Task = { id: generateId(), ...data, createdAt: now, updatedAt: now };
    const updated = [task, ...tasks];
    setTasks(updated);
    await saveTasks(updated);
  }

  async function updateTask(id: string, data: Partial<NewTask>): Promise<void> {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t
    );
    setTasks(updated);
    await saveTasks(updated);
  }

  async function deleteTask(id: string): Promise<void> {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    await saveTasks(updated);
  }

  function getTask(id: string): Task | undefined {
    return tasks.find((t) => t.id === id);
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
