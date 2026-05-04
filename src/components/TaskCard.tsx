import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Task } from "../types/task";
import { StatusBadge } from "./StatusBadge";
import { useTheme } from "../context/ThemeContext";
import { formatDate } from "../utils/formatDate";

const PRIORITY_COLOR: Record<string, string> = {
  baixa: "#43A047",
  media: "#FB8C00",
  alta: "#E53935",
};

interface TaskCardProps {
  task: Task;
  onPress: () => void;
}

export function TaskCard({ task, onPress }: TaskCardProps) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={styles.row}>
        <Text style={styles.icon}>{task.categoryIcon}</Text>
        <View style={styles.info}>
          <Text
            style={[styles.title, { color: colors.text }]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
          <Text style={[styles.category, { color: colors.subtext }]}>
            {task.category}
          </Text>
        </View>
        <View
          style={[
            styles.priority,
            { backgroundColor: PRIORITY_COLOR[task.priority] + "22" },
          ]}
        >
          <Text
            style={[
              styles.priorityText,
              { color: PRIORITY_COLOR[task.priority] },
            ]}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <StatusBadge status={task.status} />
        <Text style={[styles.date, { color: colors.subtext }]}>
          {formatDate(task.updatedAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  icon: { fontSize: 28, marginRight: 12 },
  info: { flex: 1 },
  title: { fontSize: 15, fontWeight: "700" },
  category: { fontSize: 12, marginTop: 2 },
  priority: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  priorityText: { fontSize: 11, fontWeight: "700" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: { fontSize: 11 },
});
