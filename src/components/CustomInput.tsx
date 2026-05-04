import React from 'react';
import { TextInput, Text, View, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface CustomInputProps extends TextInputProps {
  label?: string;
}

export function CustomInput({ label, ...props }: CustomInputProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.subtext }]}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        placeholderTextColor={colors.subtext}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { fontSize: 13, marginBottom: 4, fontWeight: '500' },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
});
