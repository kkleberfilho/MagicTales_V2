import React from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,KeyboardAvoidingView,Platform,ScrollView,ImageBackground,Keyboard,TouchableWithoutFeedback,} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LoginSchema } from '../../schemas/LoginSchema';

export default function TelaLogin() {
  const handleLogin = (values: { email: string; password: string }) => {
    console.log('Dados do login:', values);
    
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
              
              <Text style={styles.appName}>MagicTales</Text>

              
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <>
                    
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
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}

                    
                    <View style={styles.row}>
                      <TouchableOpacity style={styles.forgotPasswordButton}>
                        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                      </TouchableOpacity>
                    </View>

                    
                    <TouchableOpacity style={styles.loginButton} onPress={() => handleSubmit}>
                      <Text style={styles.loginButtonText}>Entrar</Text>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    marginBottom: 20,
  },
  forgotPasswordButton: {},
  forgotPasswordText: {
    fontSize: 14,
    color: '#6200ee',
    fontWeight: 'bold',
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
  registerButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 16,
    color: '#6200ee',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});