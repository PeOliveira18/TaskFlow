import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TaskStatus } from "../types/task";

export function StatusBadge({ status }: { status: TaskStatus }) {
  let label = "";
  let color = "";

  if (status === "pendente") {
    label = "Pendente";
    color = "#FB8C00";
  } else if (status === "em_andamento") {
    label = "Em andamento";
    color = "#4F6EF7";
  } else if (status === "concluida") {
    label = "Concluída";
    color = "#43A047";
  }

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: color + "22",
          borderColor: color,
        },
      ]}
    >
      <Text style={[styles.text, { color: color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 11,
    fontWeight: "600",
  },
});
