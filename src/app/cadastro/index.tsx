import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { CadastroSchema } from '@/schemas/CadastroSchema';


export default function CadastroScreen() {
  const { register } = useAuth();

  const formatarCPF = (text: string) => {
    return text
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

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

  // Conversão da data no formato DD/MM/AAAA para ISO (YYYY-MM-DD) antes de enviar
  const converterDataParaISO = (data: string) => {
    const [dia, mes, ano] = data.split('/');
    if (!dia || !mes || !ano) return '';
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  };

  const handleCadastro = async (values: any) => {
    // Converter dataNascimento para ISO antes de enviar
    const dataNascimentoISO = converterDataParaISO(values.dataNascimento);
    if (!dataNascimentoISO) {
      Alert.alert('Erro', 'Data de nascimento inválida');
      return;
    }

    const userData = {
      nomeCompleto: values.nomeCompleto,
      email: values.email,
      dataNascimento: dataNascimentoISO,
      cpf: values.cpf,
      telefone: values.telefone,
      endereco: values.endereco
    };

    const success = await register(userData, values.senha);
    if (success) {
      Alert.alert(
        'Cadastro realizado!',
        'Verifique seu email para confirmar sua conta.'
      );
      router.replace('/login');
    } else {
      Alert.alert('Erro', 'Falha ao cadastrar. Tente novamente.');
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/background2.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <Text style={styles.title}>Crie sua conta</Text>

            <Formik
              initialValues={{
                nomeCompleto: '',
                email: '',
                senha: '',
                confirmarSenha: '',
                dataNascimento: '',
                cpf: '',
                telefone: '',
                endereco: {
                  cep: '',
                  rua: '',
                  numero: '',
                  complemento: '',
                  bairro: '',
                  cidade: '',
                  estado: ''
                }
              }}
              validationSchema={CadastroSchema}
              onSubmit={handleCadastro}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <>
                  <Text style={styles.sectionTitle}>Dados Pessoais</Text>

                  <Text style={styles.label}>Nome Completo</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome completo"
                    onChangeText={handleChange('nomeCompleto')}
                    onBlur={handleBlur('nomeCompleto')}
                    value={values.nomeCompleto}
                    autoCapitalize="words"
                  />
                  {touched.nomeCompleto && errors.nomeCompleto && (
                    <Text style={styles.errorText}>{errors.nomeCompleto}</Text>
                  )}

                  <Text style={styles.label}>Data de Nascimento</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="DD/MM/AAAA"
                    onChangeText={(text) => {
                      // Formatar data para o padrão DD/MM/AAAA manualmente
                      let formatted = text.replace(/\D/g, '');
                      if (formatted.length > 2) formatted = formatted.slice(0,2) + '/' + formatted.slice(2);
                      if (formatted.length > 5) formatted = formatted.slice(0,5) + '/' + formatted.slice(5,9);
                      setFieldValue('dataNascimento', formatted);
                    }}
                    onBlur={handleBlur('dataNascimento')}
                    value={values.dataNascimento}
                    keyboardType="numeric"
                    maxLength={10}
                  />
                  {touched.dataNascimento && errors.dataNascimento && (
                    <Text style={styles.errorText}>{errors.dataNascimento}</Text>
                  )}

                  <Text style={styles.label}>CPF</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="000.000.000-00"
                    onChangeText={(text) => setFieldValue('cpf', formatarCPF(text))}
                    onBlur={handleBlur('cpf')}
                    value={values.cpf}
                    keyboardType="numeric"
                    maxLength={14}
                  />
                  {touched.cpf && errors.cpf && (
                    <Text style={styles.errorText}>{errors.cpf}</Text>
                  )}

                  <Text style={styles.label}>Telefone</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="(00) 00000-0000"
                    onChangeText={(text) => setFieldValue('telefone', formatarTelefone(text))}
                    onBlur={handleBlur('telefone')}
                    value={values.telefone}
                    keyboardType="phone-pad"
                    maxLength={15}
                  />
                  {touched.telefone && errors.telefone && (
                    <Text style={styles.errorText}>{errors.telefone}</Text>
                  )}

                  <Text style={styles.sectionTitle}>Dados de Acesso</Text>

                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}

                  <Text style={styles.label}>Senha</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Crie uma senha (mínimo 8 caracteres)"
                    onChangeText={handleChange('senha')}
                    onBlur={handleBlur('senha')}
                    value={values.senha}
                    secureTextEntry
                  />
                  {touched.senha && errors.senha && (
                    <Text style={styles.errorText}>{errors.senha}</Text>
                  )}

                  <Text style={styles.label}>Confirmar Senha</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirme sua senha"
                    onChangeText={handleChange('confirmarSenha')}
                    onBlur={handleBlur('confirmarSenha')}
                    value={values.confirmarSenha}
                    secureTextEntry
                  />
                  {touched.confirmarSenha && errors.confirmarSenha && (
                    <Text style={styles.errorText}>{errors.confirmarSenha}</Text>
                  )}

                  <Text style={styles.sectionTitle}>Endereço</Text>

                  <Text style={styles.label}>CEP</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="00000-000"
                    onChangeText={(text) => setFieldValue('endereco.cep', formatarCEP(text))}
                    onBlur={handleBlur('endereco.cep')}
                    value={values.endereco.cep}
                    keyboardType="numeric"
                    maxLength={9}
                  />
                  {touched.endereco?.cep && errors.endereco?.cep && (
                    <Text style={styles.errorText}>{errors.endereco.cep}</Text>
                  )}

                  <View style={styles.row}>
                    <View style={[styles.column, { flex: 3 }]}>
                      <Text style={styles.label}>Rua</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Nome da rua"
                        onChangeText={handleChange('endereco.rua')}
                        onBlur={handleBlur('endereco.rua')}
                        value={values.endereco.rua}
                      />
                      {touched.endereco?.rua && errors.endereco?.rua && (
                        <Text style={styles.errorText}>{errors.endereco.rua}</Text>
                      )}
                    </View>
                    <View style={[styles.column, { flex: 1, marginLeft: 10 }]}>
                      <Text style={styles.label}>Número</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Nº"
                        onChangeText={handleChange('endereco.numero')}
                        onBlur={handleBlur('endereco.numero')}
                        value={values.endereco.numero}
                        keyboardType="numeric"
                      />
                      {touched.endereco?.numero && errors.endereco?.numero && (
                        <Text style={styles.errorText}>{errors.endereco.numero}</Text>
                      )}
                    </View>
                  </View>

                  <Text style={styles.label}>Complemento</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Complemento (opcional)"
                    onChangeText={handleChange('endereco.complemento')}
                    onBlur={handleBlur('endereco.complemento')}
                    value={values.endereco.complemento}
                  />

                  <Text style={styles.label}>Bairro</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Bairro"
                    onChangeText={handleChange('endereco.bairro')}
                    onBlur={handleBlur('endereco.bairro')}
                    value={values.endereco.bairro}
                  />
                  {touched.endereco?.bairro && errors.endereco?.bairro && (
                    <Text style={styles.errorText}>{errors.endereco.bairro}</Text>
                  )}

                  <Text style={styles.label}>Cidade</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Cidade"
                    onChangeText={handleChange('endereco.cidade')}
                    onBlur={handleBlur('endereco.cidade')}
                    value={values.endereco.cidade}
                  />
                  {touched.endereco?.cidade && errors.endereco?.cidade && (
                    <Text style={styles.errorText}>{errors.endereco.cidade}</Text>
                  )}

                  <Text style={styles.label}>Estado (UF)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="UF"
                    onChangeText={(text) => setFieldValue('endereco.estado', text.toUpperCase())}
                    onBlur={handleBlur('endereco.estado')}
                    value={values.endereco.estado}
                    maxLength={2}
                    autoCapitalize="characters"
                  />
                  {touched.endereco?.estado && errors.endereco?.estado && (
                    <Text style={styles.errorText}>{errors.endereco.estado}</Text>
                  )}

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={styles.buttonText}>Cadastrar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => router.back()}
                    style={{ marginTop: 20, alignItems: 'center' }}
                  >
                    <Text style={{ color: '#fff', textDecorationLine: 'underline' }}>
                      Já tem conta? Fazer login
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  content: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'yellow',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1f6f8b',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  }
});
