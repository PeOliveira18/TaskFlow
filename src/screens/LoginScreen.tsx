import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { CustomInput } from "../components/CustomInput";
import { CustomButton } from "../components/CustomButton";

export function LoginScreen() {
  const { login } = useAuth();
  const { colors } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    setError("");
    const ok = await login(username, password);
    setLoading(false);
    if (!ok) setError("Usuário ou senha inválidos.");
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.inner}>
        <Text style={[styles.logo, { color: colors.primary }]}>TaskFlow</Text>
        <Text style={[styles.subtitle, { color: colors.subtext }]}>
          Gerencie suas tarefas
        </Text>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <CustomInput
            label="Usuário"
            value={username}
            onChangeText={setUsername}
            placeholder="admin ou user"
            autoCapitalize="none"
          />
          <CustomInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
            placeholder="123"
            secureTextEntry
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <CustomButton
            title="Entrar"
            onPress={handleLogin}
            loading={loading}
          />
        </View>

        <Text style={[styles.hint, { color: colors.subtext }]}>
          Dica: admin/123 ou user/123
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, justifyContent: "center", padding: 24 },
  logo: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: { textAlign: "center", fontSize: 15, marginBottom: 32 },
  card: {
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  error: {
    color: "#E53935",
    textAlign: "center",
    marginBottom: 8,
    fontSize: 13,
  },
  hint: { textAlign: "center", marginTop: 16, fontSize: 12 },
});
