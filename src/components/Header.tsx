import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { user, logout } = useAuth();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.role}>{user?.role === 'admin' ? '👑 Admin' : '👤 Usuário'}</Text>
      </View>
      {title && <Text style={styles.title}>{title}</Text>}
      <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 48,
  },
  name: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  role: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  logoutBtn: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: 8 },
  logoutText: { color: '#fff', fontSize: 13, fontWeight: '600' },
});
