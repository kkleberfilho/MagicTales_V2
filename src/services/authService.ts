// src/services/authService.ts
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  User,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { firebaseAuth, firebaseFirestore } from '@/config/firebaseConfig';

export interface UserAddress {
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface UserData {
  nomeCompleto: string;
  email: string;
  dataNascimento: string;
  cpf: string;
  telefone: string;
  endereco: UserAddress;
  tipoConta?: 'free' | 'premium';
  dataCadastro?: any;
}

export interface Conto {
  id: number;
  titulo: string;
  descricao: string;
}

export const authService = {
  // Observador de estado de autenticação
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(firebaseAuth, callback);
  },

  // Login
  login: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  },

  // Obter dados do usuário do Firestore
  getUserData: async (userId: string): Promise<UserData | null> => {
    try {
      const userDoc = await getDoc(doc(firebaseFirestore, 'usuarios', userId));
      return userDoc.exists() ? (userDoc.data() as UserData) : null;
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error);
      throw error;
    }
  },

  // Registro (sem verificação de CPF)
  register: async (userData: UserData, password: string) => {
    try {
      // Verifica apenas se o email já existe
      const emailQuery = await getDocs(
        query(
          collection(firebaseFirestore, 'usuarios'),
          where('email', '==', userData.email)
        )
      );

      if (!emailQuery.empty) {
        throw new Error('Email já cadastrado');
      }

      // Cria usuário no Authentication
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        userData.email,
        password
      );

      // Salva dados no Firestore
      await setDoc(doc(firebaseFirestore, 'usuarios', userCredential.user.uid), {
        ...userData,
        cpf: userData.cpf.replace(/\D/g, ''),
        telefone: userData.telefone.replace(/\D/g, ''),
        tipoConta: 'free',
        dataCadastro: serverTimestamp(),
      });

      return userCredential.user;
    } catch (error) {
      console.error("Erro no cadastro:", error);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.error("Erro no logout:", error);
      throw error;
    }
  },

  // Enviar email de verificação
  sendEmailVerification: async () => {
    if (!firebaseAuth.currentUser) {
      throw new Error('Nenhum usuário autenticado');
    }

    try {
      await sendEmailVerification(firebaseAuth.currentUser);
    } catch (error) {
      console.error("Erro ao enviar verificação:", error);
      throw error;
    }
  },

  // Obter usuário atual
  getCurrentUser: (): User | null => {
    return firebaseAuth.currentUser;
  },

  // Verificar se email já existe (opcional)
  checkEmailExists: async (email: string): Promise<boolean> => {
    try {
      const emailQuery = await getDocs(
        query(
          collection(firebaseFirestore, 'usuarios'),
          where('email', '==', email)
        )
      );
      return !emailQuery.empty;
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      throw error;
    }
  },

  updateUserData: async (userId: string, data: Partial<UserData>) => {
    try {
      const userRef = doc(firebaseFirestore, "usuarios", userId);
      await updateDoc(userRef, data);
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
      throw error;
    }
  },

  // Buscar contos do Firestore
  getContos: async (): Promise<Conto[]> => {
    try {
      const contosCollection = collection(firebaseFirestore, 'contos');
      const querySnapshot = await getDocs(contosCollection);
      const contosList: Conto[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        contosList.push({
          id: data.id,
          titulo: data.titulo,
          descricao: data.descricao,
        });
      });

      return contosList;
    } catch (error) {
      console.error("Erro ao buscar contos:", error);
      throw error;
    }
  },
};
