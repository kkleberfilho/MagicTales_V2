import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity, StyleSheet,KeyboardAvoidingView,Platform,ScrollView,ImageBackground,Keyboard,TouchableWithoutFeedback,Image} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PerfilSchema } from '@/schemas/PerfilSchema';


export default function TelaPerfil() {
    const [editando, setEditando] = useState(false); 
  
    const handleSalvar = (values: {
      username: string;
      dataNascimento: string;
      genero: string;
      emailOuTelefone: string;
      senha: string;
    }) => {
      console.log('Dados do perfil:', values);
      setEditando(false); 
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
                <View style={styles.perfilHeader}>
                  <View style={styles.fotoContainer}>
                    <Image
                      source={require('@/assets/perfil.png')} 
                      style={styles.fotoPerfil}
                    />
                  </View>
                  <Text style={styles.nomeUsuario}>João Silva</Text>
                  <Text style={styles.membroDesde}>Membro desde 2023</Text>
                </View>
  
                <Formik
                  initialValues={{
                    username: 'João Silva', 
                    dataNascimento: '01/01/1990', 
                    genero: 'Masculino', 
                    emailOuTelefone: 'joao.silva@example.com', 
                    senha: '********', 
                  }}
                  validationSchema={PerfilSchema} 
                  onSubmit={handleSalvar} 
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                    
                      <TextInput
                        style={styles.input}
                        placeholder="Nome de usuário"
                        placeholderTextColor="#999"
                        value={values.username}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        editable={editando} 
                      />
                      {touched.username && errors.username && (
                        <Text style={styles.errorText}>{errors.username}</Text>
                      )}
  
                     
                      <TextInput
                        style={styles.input}
                        placeholder="Data de nascimento"
                        placeholderTextColor="#999"
                        value={values.dataNascimento}
                        onChangeText={handleChange('dataNascimento')}
                        onBlur={handleBlur('dataNascimento')}
                        editable={editando} 
                      />
                      {touched.dataNascimento && errors.dataNascimento && (
                        <Text style={styles.errorText}>{errors.dataNascimento}</Text>
                      )}
  
                      
                      <TextInput
                        style={styles.input}
                        placeholder="Gênero"
                        placeholderTextColor="#999"
                        value={values.genero}
                        onChangeText={handleChange('genero')}
                        onBlur={handleBlur('genero')}
                        editable={editando} 
                      />
                      {touched.genero && errors.genero && (
                        <Text style={styles.errorText}>{errors.genero}</Text>
                      )}
  
                      
                      <TextInput
                        style={styles.input}
                        placeholder="Email ou telefone"
                        placeholderTextColor="#999"
                        value={values.emailOuTelefone}
                        onChangeText={handleChange('emailOuTelefone')}
                        onBlur={handleBlur('emailOuTelefone')}
                        editable={editando} 
                      />
                      {touched.emailOuTelefone && errors.emailOuTelefone && (
                        <Text style={styles.errorText}>{errors.emailOuTelefone}</Text>
                      )}
  
                      
                      <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        placeholderTextColor="#999"
                        secureTextEntry
                        value={values.senha}
                        onChangeText={handleChange('senha')}
                        onBlur={handleBlur('senha')}
                        editable={editando} 
                      />
                      {touched.senha && errors.senha && (
                        <Text style={styles.errorText}>{errors.senha}</Text>
                      )}
  
                    
                      <View style={styles.botoesContainer}>
                        {editando ? (
                          <TouchableOpacity style={styles.botaoSalvar} onPress={() => handleSubmit}>
                            <Text style={styles.botaoTexto}>Salvar</Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={styles.botaoEditar}
                            onPress={() => setEditando(true)}
                          >
                            <Text style={styles.botaoTexto}>Editar</Text>
                          </TouchableOpacity>
                        )}
                      </View>
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
    fotoPerfil: {
      width: 100, 
      height: 100,
      borderRadius: 50, 
    },
    nomeUsuario: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#6200ee',
    },
    membroDesde: {
      fontSize: 14,
      color: '#666',
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
    botoesContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    botaoEditar: {
      width: '100%',
      height: 50,
      backgroundColor: '#6200ee',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    botaoSalvar: {
      width: '100%',
      height: 50,
      backgroundColor: '#4CAF50', 
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    botaoTexto: {
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