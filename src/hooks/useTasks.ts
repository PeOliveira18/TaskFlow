import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { TaskStatus } from '../types/task';

export function useTasks() {
  const { tasks, loading, addTask, updateTask, deleteTask, getTask } = useTaskContext();
  const [filter, setFilter] = useState<TaskStatus | 'todas'>('todas');

  let filteredTasks = tasks;
  if (filter !== 'todas') {
    filteredTasks = tasks.filter((task) => task.status === filter);
  }

  return {
    tasks,
    filtered: filteredTasks,
    loading,
    filter,
    setFilter,
    addTask,
    updateTask,
    deleteTask,
    getTask,
  };
}
