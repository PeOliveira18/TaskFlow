import { useState, useMemo } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { TaskStatus } from '../types/task';

export function useTasks() {
  const ctx = useTaskContext();
  const [filter, setFilter] = useState<TaskStatus | 'todas'>('todas');

  const filtered = useMemo(() => {
    if (filter === 'todas') return ctx.tasks;
    return ctx.tasks.filter((t) => t.status === filter);
  }, [ctx.tasks, filter]);

  return { ...ctx, filtered, filter, setFilter };
}
