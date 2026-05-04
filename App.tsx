import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { TaskProvider } from './src/context/TaskContext';
import { AppRoutes } from './src/routes/AppRoutes';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TaskProvider>
          <NavigationContainer>
            <AppRoutes />
          </NavigationContainer>
        </TaskProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
