import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Colors {
  background: string;
  card: string;
  text: string;
  subtext: string;
  border: string;
  primary: string;
  danger: string;
  success: string;
  warning: string;
}

const LIGHT_COLORS: Colors = {
  background: '#F5F5F5',
  card: '#FFFFFF',
  text: '#1A1A1A',
  subtext: '#666666',
  border: '#E0E0E0',
  primary: '#4F6EF7',
  danger: '#E53935',
  success: '#43A047',
  warning: '#FB8C00',
};

const DARK_COLORS: Colors = {
  background: '#121212',
  card: '#1E1E1E',
  text: '#F5F5F5',
  subtext: '#AAAAAA',
  border: '#333333',
  primary: '#6B8BFF',
  danger: '#EF5350',
  success: '#66BB6A',
  warning: '#FFA726',
};

interface ThemeContextData {
  mode: string;
  colors: Colors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    loadTheme();
  }, []);

  async function loadTheme() {
    const savedTheme = await AsyncStorage.getItem('@taskflow:theme');
    if (savedTheme) {
      setMode(savedTheme);
    }
  }

  async function toggleTheme() {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    await AsyncStorage.setItem('@taskflow:theme', newMode);
  }

  const colors = mode === 'light' ? LIGHT_COLORS : DARK_COLORS;

  return (
    <ThemeContext.Provider value={{ mode, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
