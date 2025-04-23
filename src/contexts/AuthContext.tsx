import React, { createContext, useContext, useState } from 'react';
import { router } from 'expo-router';

interface AuthContextType {
  isAuthenticated: boolean | null;
  user: { email: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const login = (email: string, password: string) => {
    const CREDENCIAIS_FIXAS = {
      email: 'usuario@exemplo.com',
      senha: 'senha123'
    };

    if (email === CREDENCIAIS_FIXAS.email && password === CREDENCIAIS_FIXAS.senha) {
      setIsAuthenticated(true);
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}