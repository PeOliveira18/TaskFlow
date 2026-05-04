import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TaskStackParamList } from "../types/navigation";
import { TaskListScreen } from "../screens/tasks/TaskListScreen";
import { TaskDetailScreen } from "../screens/tasks/TaskDetailScreen";
import { TaskFormScreen } from "../screens/tasks/TaskFormScreen";
import { useTheme } from "../context/ThemeContext";

const Stack = createNativeStackNavigator<TaskStackParamList>();

export function TaskStackRoutes() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.primary,
        headerTitleStyle: { color: colors.text },
      }}
    >
      <Stack.Screen
        name="TaskList"
        component={TaskListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        options={{ title: "Detalhe da Tarefa" }}
      />
      <Stack.Screen
        name="TaskForm"
        component={TaskFormScreen}
        options={{ title: "Nova Tarefa" }}
      />
    </Stack.Navigator>
  );
}
