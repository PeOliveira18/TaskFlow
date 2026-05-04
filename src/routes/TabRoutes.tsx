import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { TabParamList } from '../types/navigation';
import { HomeScreen } from '../screens/home/HomeScreen';
import { TaskStackRoutes } from './TaskStackRoutes';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator<TabParamList>();

function Icon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return <Text style={{ fontSize: focused ? 22 : 18 }}>{emoji}</Text>;
}

export function TabRoutes() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subtext,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home', tabBarIcon: ({ focused }) => <Icon emoji="🏠" focused={focused} /> }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskStackRoutes}
        options={{ title: 'Tarefas', tabBarIcon: ({ focused }) => <Icon emoji="📋" focused={focused} /> }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Config.', tabBarIcon: ({ focused }) => <Icon emoji="⚙️" focused={focused} /> }}
      />
    </Tab.Navigator>
  );
}
