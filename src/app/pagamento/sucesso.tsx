import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SucessoScreen = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
      <Text style={styles.titulo}>Assinatura ativada com sucesso!</Text>
      <Text style={styles.mensagem}>Agora você tem acesso completo ao MagicTales</Text>
      
      <TouchableOpacity 
        style={styles.botao}
        onPress={() => router.replace('/conto')}
      >
        <Text style={styles.botaoTexto}>Começar a Explorar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333'
  },
  mensagem: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40
  },
  botao: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center'
  },
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default SucessoScreen;