import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { TabParamList } from "../types/navigation";
import { HomeScreen } from "../screens/home/HomeScreen";
import { TaskStackRoutes } from "./TaskStackRoutes";
import { SettingsScreen } from "../screens/settings/SettingsScreen";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Tab = createBottomTabNavigator<TabParamList>();

export function TabRoutes() {
  const { colors } = useTheme();
  const { user } = useAuth();

  const initialRoute = user?.role === "admin" ? "Settings" : "Home";

  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subtext,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskStackRoutes}
        options={{
          title: "Tarefas",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Configurações",
        }}
      />
    </Tab.Navigator>
  );
}
