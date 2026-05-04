import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { TaskStatus } from '../types/task';
import { useTheme } from '../context/ThemeContext';

type Filter = TaskStatus | 'todas';

const OPTIONS: { value: Filter; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'pendente', label: 'Pendente' },
  { value: 'em_andamento', label: 'Em andamento' },
  { value: 'concluida', label: 'Concluída' },
];

interface FilterBarProps {
  current: Filter;
  onChange: (f: Filter) => void;
}

export function FilterBar({ current, onChange }: FilterBarProps) {
  const { colors } = useTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.container}>
      {OPTIONS.map((opt) => {
        const active = current === opt.value;
        return (
          <TouchableOpacity
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[
              styles.btn,
              { borderColor: colors.primary, backgroundColor: active ? colors.primary : 'transparent' },
            ]}
          >
            <Text style={{ color: active ? '#fff' : colors.primary, fontWeight: '600', fontSize: 13 }}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { maxHeight: 50 },
  container: { paddingHorizontal: 16, paddingVertical: 8, gap: 8, flexDirection: 'row', alignItems: 'center' },
  btn: { borderRadius: 20, borderWidth: 1.5, paddingHorizontal: 14, paddingVertical: 6 },
});
