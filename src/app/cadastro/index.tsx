import React from 'react';
import {
  View,Text,TextInput,TouchableOpacity,StyleSheet,KeyboardAvoidingView,Platform, ScrollView,ImageBackground,Keyboard,TouchableWithoutFeedback,} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CadastroSchema } from '@/schemas/CadastroSchema';

export default function TelaCadastro() {
  const handleCadastro = (values: {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    telefone: string;
    endereco: string;
  }) => {
    console.log('Dados do cadastro:', values);

  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
              <Text style={styles.appName}></Text>
              <Formik
                initialValues={{
                  nome: '',
                  email: '',
                  senha: '',
                  confirmarSenha: '',
                  telefone: '',
                  endereco: '',
                }}
                validationSchema={CadastroSchema}
                onSubmit={handleCadastro}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <>

                    <TextInput
                      style={styles.input}
                      placeholder="Nome completo"
                      placeholderTextColor="#999"
                      value={values.nome}
                      onChangeText={handleChange('nome')}
                      onBlur={handleBlur('nome')}
                    />
                    {touched.nome && errors.nome && (
                      <Text style={styles.errorText}>{errors.nome}</Text>
                    )}

                   
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor="#999"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}

                    
                    <TextInput
                      style={styles.input}
                      placeholder="Senha"
                      placeholderTextColor="#999"
                      secureTextEntry
                      value={values.senha}
                      onChangeText={handleChange('senha')}
                      onBlur={handleBlur('senha')}
                    />
                    {touched.senha && errors.senha && (
                      <Text style={styles.errorText}>{errors.senha}</Text>
                    )}

                    
                    <TextInput
                      style={styles.input}
                      placeholder="Confirme a senha"
                      placeholderTextColor="#999"
                      secureTextEntry
                      value={values.confirmarSenha}
                      onChangeText={handleChange('confirmarSenha')}
                      onBlur={handleBlur('confirmarSenha')}
                    />
                    {touched.confirmarSenha && errors.confirmarSenha && (
                      <Text style={styles.errorText}>{errors.confirmarSenha}</Text>
                    )}

                    
                    <TextInput
                      style={styles.input}
                      placeholder="Telefone"
                      placeholderTextColor="#999"
                      value={values.telefone}
                      onChangeText={handleChange('telefone')}
                      onBlur={handleBlur('telefone')}
                      keyboardType="phone-pad"
                    />
                    {touched.telefone && errors.telefone && (
                      <Text style={styles.errorText}>{errors.telefone}</Text>
                    )}

                    
                    <TextInput
                      style={styles.input}
                      placeholder="Endereço"
                      placeholderTextColor="#999"
                      value={values.endereco}
                      onChangeText={handleChange('endereco')}
                      onBlur={handleBlur('endereco')}
                    />
                    {touched.endereco && errors.endereco && (
                      <Text style={styles.errorText}>{errors.endereco}</Text>
                    )}

                    
                    <TouchableOpacity style={styles.loginButton} onPress={ () => handleSubmit}>
                      <Text style={styles.loginButtonText}>CADASTRAR</Text>
                    </TouchableOpacity>
                  </>
                )}
              </Formik>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#6200ee',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});