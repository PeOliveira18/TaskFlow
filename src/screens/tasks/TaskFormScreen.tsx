import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../../types/navigation';
import { useTaskContext } from '../../context/TaskContext';
import { useTheme } from '../../context/ThemeContext';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { TaskStatus, TaskPriority } from '../../types/task';
import { CATEGORIES } from '../../services/api';

type Nav = NativeStackNavigationProp<TaskStackParamList, 'TaskForm'>;
type Route = RouteProp<TaskStackParamList, 'TaskForm'>;

const STATUSES: TaskStatus[] = ['pendente', 'em_andamento', 'concluida'];
const STATUS_LABELS: Record<TaskStatus, string> = {
  pendente: 'Pendente',
  em_andamento: 'Em andamento',
  concluida: 'Concluída',
};
const PRIORITIES: TaskPriority[] = ['baixa', 'media', 'alta'];
const PRIORITY_LABELS: Record<TaskPriority, string> = { baixa: 'Baixa', media: 'Média', alta: 'Alta' };

export function TaskFormScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<Route>();
  const { addTask, updateTask, getTask } = useTaskContext();
  const { colors } = useTheme();

  const editing = params?.taskId ? getTask(params.taskId) : undefined;

  const [title, setTitle] = useState(editing?.title ?? '');
  const [description, setDescription] = useState(editing?.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(editing?.status ?? 'pendente');
  const [priority, setPriority] = useState<TaskPriority>(editing?.priority ?? 'media');
  const [category, setCategory] = useState(editing?.category ?? CATEGORIES[0].name);
  const [categoryIcon, setCategoryIcon] = useState(editing?.categoryIcon ?? CATEGORIES[0].icon);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: editing ? 'Editar Tarefa' : 'Nova Tarefa' });
  }, [editing]);

  async function handleSave() {
    if (!title.trim()) {
      Alert.alert('Atenção', 'O título é obrigatório.');
      return;
    }
    setLoading(true);
    if (editing) {
      await updateTask(editing.id, { title, description, status, priority, category, categoryIcon });
    } else {
      await addTask({ title, description, status, priority, category, categoryIcon });
    }
    setLoading(false);
    navigation.goBack();
  }

  function selectCategory(name: string, icon: string) {
    setCategory(name);
    setCategoryIcon(icon);
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <CustomInput label="Título *" value={title} onChangeText={setTitle} placeholder="Ex: Estudar React Native" />
      <CustomInput label="Descrição" value={description} onChangeText={setDescription} placeholder="Descreva a tarefa..." multiline numberOfLines={3} />

      <Text style={[styles.label, { color: colors.subtext }]}>Status</Text>
      <View style={styles.chips}>
        {STATUSES.map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setStatus(s)}
            style={[styles.chip, { borderColor: colors.primary, backgroundColor: status === s ? colors.primary : 'transparent' }]}
          >
            <Text style={{ color: status === s ? '#fff' : colors.primary, fontSize: 13, fontWeight: '600' }}>
              {STATUS_LABELS[s]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.label, { color: colors.subtext }]}>Prioridade</Text>
      <View style={styles.chips}>
        {PRIORITIES.map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => setPriority(p)}
            style={[styles.chip, { borderColor: colors.primary, backgroundColor: priority === p ? colors.primary : 'transparent' }]}
          >
            <Text style={{ color: priority === p ? '#fff' : colors.primary, fontSize: 13, fontWeight: '600' }}>
              {PRIORITY_LABELS[p]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.label, { color: colors.subtext }]}>Categoria</Text>
      <View style={styles.categories}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.slug}
            onPress={() => selectCategory(cat.name, cat.icon)}
            style={[styles.catBtn, { borderColor: colors.primary, backgroundColor: category === cat.name ? colors.primary : colors.card }]}
          >
            <Text style={styles.catIcon}>{cat.icon}</Text>
            <Text style={{ color: category === cat.name ? '#fff' : colors.text, fontSize: 12 }}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <CustomButton title={editing ? 'Salvar alterações' : 'Criar tarefa'} onPress={handleSave} loading={loading} />
      <CustomButton title="Cancelar" onPress={() => navigation.goBack()} variant="outline" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 4, paddingBottom: 40 },
  label: { fontSize: 13, fontWeight: '500', marginBottom: 8, marginTop: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  chip: { borderRadius: 20, borderWidth: 1.5, paddingHorizontal: 14, paddingVertical: 8 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  catBtn: { borderRadius: 12, borderWidth: 1.5, paddingHorizontal: 12, paddingVertical: 8, alignItems: 'center', minWidth: 80 },
  catIcon: { fontSize: 22, marginBottom: 2 },
});
