import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useTaskContext } from '../../context/TaskContext';
import { Header } from '../../components/Header';
import { fetchMotivationalQuote } from '../../services/api';

export function HomeScreen() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const { tasks } = useTaskContext();
  const [quote, setQuote] = useState('');
  const [quoteLoading, setQuoteLoading] = useState(true);

  useEffect(() => {
    fetchMotivationalQuote().then((q) => {
      setQuote(q);
      setQuoteLoading(false);
    });
  }, []);

  const pending = tasks.filter((t) => t.status === 'pendente').length;
  const inProgress = tasks.filter((t) => t.status === 'em_andamento').length;
  const done = tasks.filter((t) => t.status === 'concluida').length;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.welcome, { color: colors.text }]}>
          Olá, {user?.name?.split(' ')[0]}! 👋
        </Text>

        <View style={[styles.quoteCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.quoteLabel}>💡 Frase do dia</Text>
          {quoteLoading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.quote}>{quote}</Text>
          }
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Resumo de tarefas</Text>
        <View style={styles.stats}>
          <StatCard label="Pendentes" value={pending} color="#FB8C00" />
          <StatCard label="Em andamento" value={inProgress} color="#4F6EF7" />
          <StatCard label="Concluídas" value={done} color="#43A047" />
        </View>
      </ScrollView>
    </View>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.statCard, { backgroundColor: colors.card, borderTopColor: color, borderTopWidth: 3 }]}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.subtext }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  welcome: { fontSize: 22, fontWeight: '800', marginBottom: 16 },
  quoteCard: { borderRadius: 14, padding: 18, marginBottom: 24 },
  quoteLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 8, fontWeight: '600' },
  quote: { color: '#fff', fontSize: 15, lineHeight: 22, fontStyle: 'italic' },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12 },
  stats: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, borderRadius: 12, padding: 14, alignItems: 'center', elevation: 1, shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } },
  statValue: { fontSize: 28, fontWeight: '900' },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
});
