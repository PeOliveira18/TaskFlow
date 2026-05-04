import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = 'Nenhuma tarefa encontrada.' }: EmptyStateProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📭</Text>
      <Text style={[styles.text, { color: colors.subtext }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  icon: { fontSize: 48, marginBottom: 12 },
  text: { fontSize: 15, textAlign: 'center' },
});
