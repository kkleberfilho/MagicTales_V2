import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const PerfilSchema = Yup.object().shape({
  username: Yup.string().required('Obrigatório'),
  email: Yup.string().email('Email inválido').required('Obrigatório'),
});

export default function PerfilScreen() {
  const [editando, setEditando] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  // Dados fictícios baseados no schema de cadastro
  const dadosFicticios = {
    nomeCompleto: "Ana Silva",
    telefone: "(11) 98765-4321",
    dataNascimento: "15/05/1990",
    cpf: "123.456.789-00",
    endereco: {
      rua: "Rua das Flores, 123",
      bairro: "Jardim Primavera",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-567"
    }
  };

  if (isAuthenticated === false) {
    return <Redirect href="/login" />;
  }

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ImageBackground 
      source={require('@/assets/background2.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Formik
            initialValues={{
              username: user?.email.split('@')[0] || 'Usuário',
              email: user?.email || '',
            }}
            validationSchema={PerfilSchema}
            onSubmit={(values) => {
              console.log('Dados atualizados:', values);
              setEditando(false);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                {/* Cabeçalho do Perfil */}
                <View style={styles.perfilHeader}>
                  <View style={styles.fotoContainer}>
                    <View style={styles.avatar}>
                      <Ionicons name="person" size={50} color="#6200ee" />
                    </View>
                  </View>
                  <Text style={styles.username}>{dadosFicticios.nomeCompleto}</Text>
                  <Text style={styles.membroDesde}>Membro desde 2023</Text>
                </View>

                {/* Seção de Dados Pessoais */}
                <Text style={styles.sectionTitle}>Dados Pessoais</Text>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Email:</Text>
                  <Text style={styles.infoValue}>{user?.email}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>CPF:</Text>
                  <Text style={styles.infoValue}>{dadosFicticios.cpf}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Telefone:</Text>
                  <Text style={styles.infoValue}>{dadosFicticios.telefone}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Nascimento:</Text>
                  <Text style={styles.infoValue}>{dadosFicticios.dataNascimento}</Text>
                </View>

                {/* Seção de Endereço */}
                <Text style={styles.sectionTitle}>Endereço</Text>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>CEP:</Text>
                  <Text style={styles.infoValue}>{dadosFicticios.endereco.cep}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Rua:</Text>
                  <Text style={styles.infoValue}>{dadosFicticios.endereco.rua}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Bairro:</Text>
                  <Text style={styles.infoValue}>{dadosFicticios.endereco.bairro}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Cidade/UF:</Text>
                  <Text style={styles.infoValue}>
                    {dadosFicticios.endereco.cidade} - {dadosFicticios.endereco.estado}
                  </Text>
                </View>

                {/* Botões de Ação */}
                <TouchableOpacity
                  style={editando ? styles.saveButton : styles.editButton}
                  onPress={() => editando ? handleSubmit() : setEditando(true)}
                >
                  <Text style={styles.buttonText}>
                    {editando ? 'Salvar alterações' : 'Editar perfil'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={logout}
                >
                  <Text style={styles.buttonText}>Sair da conta</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  perfilHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  fotoContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
  },
  membroDesde: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoLabel: {
    fontWeight: '600',
    color: '#333',
    width: 100,
  },
  infoValue: {
    flex: 1,
    color: '#555',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 5,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});