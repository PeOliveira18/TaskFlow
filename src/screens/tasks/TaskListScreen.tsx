import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { TaskStackParamList } from '../../types/navigation';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';
import { TaskCard } from '../../components/TaskCard';
import { FilterBar } from '../../components/FilterBar';
import { EmptyState } from '../../components/EmptyState';

type Nav = NativeStackNavigationProp<TaskStackParamList, 'TaskList'>;

export function TaskListScreen() {
  const navigation = useNavigation<Nav>();
  const { filtered, filter, setFilter, loading } = useTasks();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Tarefas" />
      <FilterBar current={filter} onChange={setFilter} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard task={item} onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })} />
        )}
        ListEmptyComponent={!loading ? <EmptyState message="Nenhuma tarefa aqui. Crie uma!" /> : null}
        contentContainerStyle={filtered.length === 0 ? styles.empty : styles.list}
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('TaskForm', {})}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingBottom: 80 },
  empty: { flex: 1 },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', elevation: 4, shadowOpacity: 0.2, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },
  fabText: { color: '#fff', fontSize: 28, lineHeight: 32 },
});
