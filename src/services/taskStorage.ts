import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

const TASKS_KEY = '@taskflow:tasks';

export async function loadTasks(): Promise<Task[]> {
  try {
    const data = await AsyncStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}
