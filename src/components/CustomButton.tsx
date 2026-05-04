import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'danger' | 'outline';
  loading?: boolean;
  disabled?: boolean;
}

export function CustomButton({ title, onPress, variant = 'primary', loading, disabled }: CustomButtonProps) {
  const { colors } = useTheme();

  const bg =
    variant === 'primary' ? colors.primary :
    variant === 'danger' ? colors.danger :
    'transparent';

  const textColor =
    variant === 'outline' ? colors.primary : '#fff';

  const borderColor =
    variant === 'outline' ? colors.primary : 'transparent';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.btn,
        { backgroundColor: bg, borderColor, borderWidth: variant === 'outline' ? 2 : 0 },
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading
        ? <ActivityIndicator color={textColor} />
        : <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginVertical: 4 },
  text: { fontWeight: '700', fontSize: 15 },
  disabled: { opacity: 0.5 },
});
