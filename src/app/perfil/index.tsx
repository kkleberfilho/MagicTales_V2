import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '@/services/authService';

export default function PerfilScreen() {
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [formValues, setFormValues] = useState({
    nomeCompleto: '',
    telefone: '',
    endereco: {
      rua: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      numero: '',
      complemento: '',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const user = authService.getCurrentUser();
      if (!user) {
        router.replace('/login');
        return;
      }

      try {
        const data = await authService.getUserData(user.uid);
        if (data) {
          setUserData(data);
          setFormValues({
            nomeCompleto: data.nomeCompleto || '',
            telefone: data.telefone || '',
            endereco: {
              rua: data.endereco?.rua || '',
              bairro: data.endereco?.bairro || '',
              cidade: data.endereco?.cidade || '',
              estado: data.endereco?.estado || '',
              cep: data.endereco?.cep || '',
              numero: data.endereco?.numero || '',
              complemento: data.endereco?.complemento || '',
            },
          });
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const user = authService.getCurrentUser();
      if (!user) {
        router.replace('/login');
        return;
      }

      await authService.updateUserData(user.uid, {
        nomeCompleto: formValues.nomeCompleto.trim(),
        telefone: formValues.telefone.replace(/\D/g, ''),
        endereco: {
          rua: formValues.endereco.rua.trim(),
          bairro: formValues.endereco.bairro.trim(),
          cidade: formValues.endereco.cidade.trim(),
          estado: formValues.endereco.estado.toUpperCase().trim(),
          cep: formValues.endereco.cep.replace(/\D/g, ''),
          numero: formValues.endereco.numero.trim(),
          complemento: formValues.endereco.complemento.trim(),
        },
        // CPF não enviado para atualização para manter imutável
      });

      // Atualiza os dados locais após edição
      const updatedData = await authService.getUserData(user.uid);
      setUserData(updatedData);
      setEditando(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.replace('/login');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível sair da conta');
    }
  };

  // Formatação dos campos com máscara
  const formatarTelefone = (text: string) => {
    return text
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
  };

  const formatarCEP = (text: string) => {
    return text
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const formatarCPF = (text: string) => {
    return text
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <ImageBackground
      source={require('@/assets/background2.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.perfilHeader}>
            <View style={styles.fotoContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={50} color="#6200ee" />
              </View>
            </View>

            {editando ? (
              <TextInput
                style={[styles.input, styles.usernameInput]}
                value={formValues.nomeCompleto}
                onChangeText={(text) =>
                  setFormValues({ ...formValues, nomeCompleto: text })
                }
                placeholder="Nome completo"
              />
            ) : (
              <Text style={styles.username}>{userData.nomeCompleto}</Text>
            )}

            <Text style={styles.membroDesde}>
              Membro desde{' '}
              {userData.dataCadastro?.toDate
                ? userData.dataCadastro.toDate().getFullYear()
                : new Date().getFullYear()}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Dados Pessoais</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{userData.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>CPF:</Text>
            {/* CPF não editável */}
            <Text style={[styles.infoValue, { fontWeight: 'bold' }]}>
              {formatarCPF(userData.cpf)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Telefone:</Text>
            {editando ? (
              <TextInput
                style={[styles.input, styles.infoInput]}
                value={formatarTelefone(formValues.telefone)}
                onChangeText={(text) => {
                  const formatted = text.replace(/\D/g, '');
                  setFormValues({ ...formValues, telefone: formatted });
                }}
                keyboardType="phone-pad"
                maxLength={15}
                placeholder="(00) 00000-0000"
              />
            ) : (
              <Text style={styles.infoValue}>{formatarTelefone(userData.telefone)}</Text>
            )}
          </View>

          <Text style={styles.sectionTitle}>Endereço</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>CEP:</Text>
            {editando ? (
              <TextInput
                style={[styles.input, styles.infoInput]}
                value={formatarCEP(formValues.endereco.cep)}
                onChangeText={(text) => {
                  const formatted = text.replace(/\D/g, '');
                  setFormValues({
                    ...formValues,
                    endereco: { ...formValues.endereco, cep: formatted },
                  });
                }}
                maxLength={9}
                placeholder="00000-000"
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.infoValue}>{formatarCEP(userData.endereco.cep)}</Text>
            )}
          </View>

          {[
            { label: 'Rua', key: 'rua', keyboardType: 'default' },
            { label: 'Número', key: 'numero', keyboardType: 'numeric' },
            { label: 'Bairro', key: 'bairro', keyboardType: 'default' },
            { label: 'Cidade', key: 'cidade', keyboardType: 'default' },
            { label: 'Estado', key: 'estado', keyboardType: 'default', maxLength: 2 },
            { label: 'Complemento', key: 'complemento', keyboardType: 'default' },
          ].map(({ label, key, keyboardType, maxLength }) => (
            <View style={styles.infoRow} key={key}>
              <Text style={styles.infoLabel}>{label}:</Text>
              {editando ? (
                <TextInput
                  style={[styles.input, styles.infoInput]}
                  value={formValues.endereco[key as keyof typeof formValues.endereco]}
                  onChangeText={(text) => {
                    const valor = key === 'estado' ? text.toUpperCase() : text;
                    setFormValues({
                      ...formValues,
                      endereco: { ...formValues.endereco, [key]: valor },
                    });
                  }}
                  keyboardType={keyboardType as any}
                  maxLength={maxLength}
                  placeholder={label}
                />
              ) : (
                <Text style={styles.infoValue}>{userData.endereco[key]}</Text>
              )}
            </View>
          ))}

          <View style={styles.buttonsContainer}>
            {editando ? (
              <>
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => {
                    // Reseta formValues para userData ao cancelar edição
                    setFormValues({
                      nomeCompleto: userData.nomeCompleto || '',
                      telefone: userData.telefone || '',
                      endereco: {
                        rua: userData.endereco?.rua || '',
                        bairro: userData.endereco?.bairro || '',
                        cidade: userData.endereco?.cidade || '',
                        estado: userData.endereco?.estado || '',
                        cep: userData.endereco?.cep || '',
                        numero: userData.endereco?.numero || '',
                        complemento: userData.endereco?.complemento || '',
                      },
                    });
                    setEditando(false);
                  }}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setEditando(true)}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.logoutButton]}
                  onPress={handleLogout}
                >
                  <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  content: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 16,
    elevation: 5,
  },
  perfilHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  fotoContainer: {
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: '#d1c4e9',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  usernameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#6200ee',
    color: '#6200ee',
    width: '100%',
    textAlign: 'center',
  },
  membroDesde: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#6200ee',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontWeight: '600',
    width: 100,
    color: '#333',
  },
  infoValue: {
    flex: 1,
    fontSize: 16,
    color: '#444',
  },
  infoInput: {
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 4,
    color: '#222',
  },
  input: {
    paddingHorizontal: 8,
  },
  buttonsContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#aaa',
  },
  logoutButton: {
    backgroundColor: '#b00020',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
