import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/contexts/AuthContext';


const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Obrigatório'),
  senha: Yup.string().required('Obrigatório'),
});

export default function LoginScreen() {
  const { login, loading } = useAuth();

  const handleLogin = async (values: { email: string, senha: string }) => {
    const success = await login(values.email, values.senha);
    if (success) {
      router.replace('/conto');
    } else {
      Alert.alert('Erro', 'Email ou senha incorretos');
    }
  };

  return (
    <ImageBackground 
      source={require('@/assets/background2.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Formik
          initialValues={{ email: '', senha: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.formContainer}>
              <Text style={styles.title}>Login</Text>

              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Senha"
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                value={values.senha}
                secureTextEntry
              />
              {touched.senha && errors.senha && (
                <Text style={styles.errorText}>{errors.senha}</Text>
              )}

              <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleSubmit()}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Carregando...' : 'Entrar'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.button} 
                onPress={() => router.push('/')} 
              >
                <Text style={styles.buttonText}>Voltar</Text>
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Não tem uma conta?</Text>
                <Link href="/cadastro" asChild>
                  <TouchableOpacity>
                    <Text style={styles.footerLink}>Cadastre-se</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )}
        </Formik>
      </View>
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
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
  },
  footerLink: {
    color: '#6200ee',
    fontWeight: 'bold',
    marginTop: 5,
  },
});