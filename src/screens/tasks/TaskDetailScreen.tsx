import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TaskStackParamList } from '../../types/navigation';
import { useTaskContext } from '../../context/TaskContext';
import { useTheme } from '../../context/ThemeContext';
import { StatusBadge } from '../../components/StatusBadge';
import { CustomButton } from '../../components/CustomButton';
import { formatDate } from '../../utils/formatDate';

type Nav = NativeStackNavigationProp<TaskStackParamList, 'TaskDetail'>;
type Route = RouteProp<TaskStackParamList, 'TaskDetail'>;

const PRIORITY_LABEL: Record<string, string> = { baixa: 'Baixa', media: 'Média', alta: 'Alta' };

export function TaskDetailScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<Route>();
  const { getTask, deleteTask } = useTaskContext();
  const { colors } = useTheme();
  const task = getTask(params.taskId);

  if (!task) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Tarefa não encontrada.</Text>
      </View>
    );
  }

  function handleDelete() {
    Alert.alert('Excluir tarefa', 'Tem certeza?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir', style: 'destructive',
        onPress: async () => {
          await deleteTask(task.id);
          navigation.goBack();
        },
      },
    ]);
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={styles.icon}>{task.categoryIcon}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>
        <Text style={[styles.category, { color: colors.subtext }]}>{task.category}</Text>
        <View style={styles.row}>
          <StatusBadge status={task.status} />
          <Text style={[styles.priority, { color: colors.subtext }]}>{PRIORITY_LABEL[task.priority]}</Text>
        </View>
      </View>

      {task.description ? (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionLabel, { color: colors.subtext }]}>Descrição</Text>
          <Text style={[styles.description, { color: colors.text }]}>{task.description}</Text>
        </View>
      ) : null}

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionLabel, { color: colors.subtext }]}>Datas</Text>
        <Text style={[styles.dateText, { color: colors.text }]}>Criado em: {formatDate(task.createdAt)}</Text>
        <Text style={[styles.dateText, { color: colors.text }]}>Atualizado em: {formatDate(task.updatedAt)}</Text>
      </View>

      <CustomButton title="Editar" onPress={() => navigation.navigate('TaskForm', { taskId: task.id })} />
      <CustomButton title="Excluir" onPress={handleDelete} variant="danger" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 12 },
  card: { borderRadius: 14, padding: 16, elevation: 1, shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } },
  icon: { fontSize: 40, textAlign: 'center', marginBottom: 8 },
  title: { fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 4 },
  category: { textAlign: 'center', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priority: { fontSize: 13 },
  sectionLabel: { fontSize: 12, fontWeight: '600', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  description: { fontSize: 15, lineHeight: 22 },
  dateText: { fontSize: 13, marginTop: 4 },
});
