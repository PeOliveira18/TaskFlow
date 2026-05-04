import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "danger" | "outline";
  loading?: boolean;
}

export function CustomButton({
  title,
  onPress,
  variant = "primary",
  loading,
}: CustomButtonProps) {
  const { colors } = useTheme();

  let backgroundColor = colors.primary;
  let textColor = "#fff";
  let borderWidth = 0;

  if (variant === "danger") {
    backgroundColor = colors.danger;
  } else if (variant === "outline") {
    backgroundColor = "transparent";
    textColor = colors.primary;
    borderWidth = 2;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[
        styles.btn,
        {
          backgroundColor: backgroundColor,
          borderColor: colors.primary,
          borderWidth: borderWidth,
          opacity: loading ? 0.5 : 1,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginVertical: 4,
  },
  text: {
    fontWeight: "700",
    fontSize: 15,
  },
});
