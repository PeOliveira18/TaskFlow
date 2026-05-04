import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { TaskStatus } from '../types/task';
import { useTheme } from '../context/ThemeContext';

type Filter = TaskStatus | 'todas';

interface FilterBarProps {
  current: Filter;
  onChange: (f: Filter) => void;
}

export function FilterBar({ current, onChange }: FilterBarProps) {
  const { colors } = useTheme();

  const filters = [
    { value: 'todas' as Filter, label: 'Todas' },
    { value: 'pendente' as Filter, label: 'Pendente' },
    { value: 'em_andamento' as Filter, label: 'Em andamento' },
    { value: 'concluida' as Filter, label: 'Concluída' },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => {
        const isActive = current === filter.value;
        const backgroundColor = isActive ? colors.primary : 'transparent';
        const textColor = isActive ? '#fff' : colors.primary;

        return (
          <TouchableOpacity
            key={filter.value}
            onPress={() => onChange(filter.value)}
            style={[
              styles.btn,
              {
                borderColor: colors.primary,
                backgroundColor: backgroundColor,
              },
            ]}
          >
            <Text style={{ color: textColor, fontWeight: '600', fontSize: 13 }}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    maxHeight: 50,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    borderRadius: 20,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
});
