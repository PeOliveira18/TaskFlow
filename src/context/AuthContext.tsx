import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

const USERS: User[] = [
  { id: 1, username: 'admin', password: '123', role: 'admin', name: 'Administrador' },
  { id: 2, username: 'user', password: '123', role: 'user', name: 'Usuário Comum' },
];

const AUTH_KEY = '@taskflow:user';

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
    AsyncStorage.getItem(AUTH_KEY).then((data) => {
      if (data) setUser(JSON.parse(data));
      setLoading(false);
    });
  }, []);

  async function login(username: string, password: string): Promise<boolean> {
    const found = USERS.find((u) => u.username === username && u.password === password);
    if (!found) return false;
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(found));
    setUser(found);
    return true;
  }

  async function logout(): Promise<void> {
    await AsyncStorage.removeItem(AUTH_KEY);
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
