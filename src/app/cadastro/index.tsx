import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const CadastroSchema = Yup.object().shape({
  nomeCompleto: Yup.string().required('Nome completo é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: Yup.string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .required('Senha é obrigatória'),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha')], 'As senhas não coincidem')
    .required('Confirmação de senha é obrigatória'),
  dataNascimento: Yup.date()
    .max(new Date(), 'Data não pode ser no futuro')
    .required('Data de nascimento é obrigatória'),
  cpf: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
    .required('CPF é obrigatório'),
  telefone: Yup.string()
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido')
    .required('Telefone é obrigatório'),
  endereco: Yup.object().shape({
    cep: Yup.string().matches(/^\d{5}-\d{3}$/, 'CEP inválido'),
    rua: Yup.string().required('Rua é obrigatória'),
    numero: Yup.string().required('Número é obrigatório'),
    complemento: Yup.string(),
    bairro: Yup.string().required('Bairro é obrigatório'),
    cidade: Yup.string().required('Cidade é obrigatória'),
    estado: Yup.string().required('Estado é obrigatório'),
  })
});

export default function CadastroScreen() {
  const { login } = useAuth();

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

  const handleCadastro = (values: any) => {
    console.log('Dados do cadastro:', values);
    login(values.email, values.senha);
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
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
                  />
                  {touched.nomeCompleto && errors.nomeCompleto && (
                    <Text style={styles.errorText}>{errors.nomeCompleto}</Text>
                  )}

                  <Text style={styles.label}>Data de Nascimento</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="DD/MM/AAAA"
                    onChangeText={handleChange('dataNascimento')}
                    onBlur={handleBlur('dataNascimento')}
                    value={values.dataNascimento}
                    keyboardType="numeric"
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
                      <Text style={styles.label}>Nº</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Número"
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
                    placeholder="Apto, bloco, etc."
                    onChangeText={handleChange('endereco.complemento')}
                    onBlur={handleBlur('endereco.complemento')}
                    value={values.endereco.complemento}
                  />

                  <Text style={styles.label}>Bairro</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nome do bairro"
                    onChangeText={handleChange('endereco.bairro')}
                    onBlur={handleBlur('endereco.bairro')}
                    value={values.endereco.bairro}
                  />
                  {touched.endereco?.bairro && errors.endereco?.bairro && (
                    <Text style={styles.errorText}>{errors.endereco.bairro}</Text>
                  )}

                  <View style={styles.row}>
                    <View style={[styles.column, { flex: 3 }]}>
                      <Text style={styles.label}>Cidade</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Nome da cidade"
                        onChangeText={handleChange('endereco.cidade')}
                        onBlur={handleBlur('endereco.cidade')}
                        value={values.endereco.cidade}
                      />
                      {touched.endereco?.cidade && errors.endereco?.cidade && (
                        <Text style={styles.errorText}>{errors.endereco.cidade}</Text>
                      )}
                    </View>
                    <View style={[styles.column, { flex: 1, marginLeft: 10 }]}>
                      <Text style={styles.label}>UF</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="UF"
                        onChangeText={handleChange('endereco.estado')}
                        onBlur={handleBlur('endereco.estado')}
                        value={values.endereco.estado}
                        maxLength={2}
                      />
                      {touched.endereco?.estado && errors.endereco?.estado && (
                        <Text style={styles.errorText}>{errors.endereco.estado}</Text>
                      )}
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleSubmit()}
                  >
                    <Text style={styles.buttonText}>Cadastrar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => router.push('/')} 
                  >
                    <Text style={styles.buttonText}>Voltar</Text>
                  </TouchableOpacity>

                  <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Já tem uma conta?</Text>
                    <Link href="/login" asChild>
                      <TouchableOpacity>
                        <Text style={styles.loginLink}>Faça login</Text>
                      </TouchableOpacity>
                    </Link>
                  </View>
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
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  loginText: {
    color: '#666',
    marginRight: 5,
  },
  loginLink: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
});