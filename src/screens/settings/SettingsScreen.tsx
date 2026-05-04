import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Header } from "../../components/Header";

const TREATMENTS = ["Sr.", "Sra.", "Srta.", "Dr.", "Dra."];

export function SettingsScreen() {
  const { user } = useAuth();
  const { colors, mode, toggleTheme } = useTheme();
  const [treatment, setTreatment] = useState("Sr.");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Configurações" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Perfil
          </Text>
          <Row label="Nome" value={user?.name ?? ""} colors={colors} />
          <Row label="Usuário" value={user?.username ?? ""} colors={colors} />
          <Row
            label="Perfil"
            value={user?.role === "admin" ? "Administrador" : "Usuário"}
            colors={colors}
          />
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Aparência
          </Text>
          <View style={styles.switchRow}>
            <Text style={[styles.switchLabel, { color: colors.text }]}>
              {mode === "dark" ? "Tema escuro" : "Tema claro"}
            </Text>
            <Switch
              value={mode === "dark"}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Tratamento
          </Text>
          <View style={styles.treatments}>
            {TREATMENTS.map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setTreatment(t)}
                style={[
                  styles.treatmentBtn,
                  {
                    borderColor: colors.primary,
                    backgroundColor:
                      treatment === t ? colors.primary : "transparent",
                  },
                ]}
              >
                <Text
                  style={{
                    color: treatment === t ? "#fff" : colors.primary,
                    fontWeight: "600",
                  }}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function Row({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: any;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, { color: colors.subtext }]}>{label}</Text>
      <Text style={[styles.rowValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 12 },
  card: {
    borderRadius: 14,
    padding: 16,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  sectionTitle: { fontSize: 15, fontWeight: "700", marginBottom: 14 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  rowLabel: { fontSize: 14 },
  rowValue: { fontSize: 14, fontWeight: "600" },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchLabel: { fontSize: 15 },
  treatments: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 },
  treatmentBtn: {
    borderRadius: 20,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
});
