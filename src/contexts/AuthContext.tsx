// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendEmailVerification, User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { router } from 'expo-router';
import { firebaseAuth, firebaseFirestore } from '@/config/firebaseConfig';

interface UserAddress {
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface UserData {
  nomeCompleto: string;
  email: string;
  dataNascimento: string;
  cpf: string;
  telefone: string;
  endereco: UserAddress;
  tipoConta?: 'free' | 'premium';
  dataCadastro?: any;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: UserData, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  sendEmailVerification: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsAuthenticated(true);

        const userDoc = await getDoc(doc(firebaseFirestore, 'usuarios', firebaseUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }
      } else {
        setUser(null);
        setUserData(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);

      console.log('Usuário logado:', userCredential.user.uid);

      const userDoc = await getDoc(doc(firebaseFirestore, 'usuarios', userCredential.user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);

        console.log('Dados do usuário:', userDoc.data());
      }

      setUser(userCredential.user);
      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      console.error("Erro no login:", error);
      Alert.alert('Erro', 'Credenciais inválidas');
      return false;
    }
  };

  const register = async (userData: UserData, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, userData.email, password);

      console.log('Usuário cadastrado:', userCredential.user.uid);

      await setDoc(doc(firebaseFirestore, 'usuarios', userCredential.user.uid), {
        ...userData,
        tipoConta: 'free',
        dataCadastro: serverTimestamp(),
      });

      console.log('Dados do usuário salvos no Firestore.');

      setUser(userCredential.user);
      setUserData(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      Alert.alert('Erro', 'Falha no cadastro: ' + error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(firebaseAuth);
      setUser(null);
      setUserData(null);
      setIsAuthenticated(false);
      router.replace('/login');
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  const sendEmailVerificationToUser = async () => {
    if (firebaseAuth.currentUser) {
      try {
        await sendEmailVerification(firebaseAuth.currentUser);
        Alert.alert('Sucesso', 'Email de verificação enviado!');
      } catch (error) {
        console.error("Erro ao enviar verificação:", error);
        Alert.alert('Erro', 'Falha ao enviar email de verificação');
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        sendEmailVerification: sendEmailVerificationToUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
