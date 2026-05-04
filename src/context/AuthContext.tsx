import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/user";

const USERS: User[] = [
  {
    id: 1,
    username: "admin",
    password: "123",
    role: "admin",
    name: "Administrador",
  },
  {
    id: 2,
    username: "user",
    password: "123",
    role: "user",
    name: "Usuário Comum",
  },
];

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const savedUser = await AsyncStorage.getItem("@taskflow:user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }

  async function login(username: string, password: string) {
    const foundUser = USERS.find(
      (u) => u.username === username && u.password === password,
    );

    if (!foundUser) {
      return false;
    }

    await AsyncStorage.setItem("@taskflow:user", JSON.stringify(foundUser));
    setUser(foundUser);
    return true;
  }

  async function logout() {
    await AsyncStorage.removeItem("@taskflow:user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
