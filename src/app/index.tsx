import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ImageBackground,ScrollView,} from 'react-native';

export default function TelaHome() {
  return (
    <ImageBackground
      source={require('@/assets/background2.jpg')} 
      style={styles.background}
      resizeMode="cover" 
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          
          <Text style={styles.appName}>MagicTales</Text>

          
          <Text style={styles.descricao}>
            Bem-vindo ao MagicTales! Aqui você pode explorar histórias incríveis,
            conectar-se com outros usuários e criar suas próprias aventuras.
          </Text>

          
          <TouchableOpacity style={styles.botao} onPress={() => {}}>
            <Text style={styles.botaoTexto}>Entrar</Text>
          </TouchableOpacity>

          
          <TouchableOpacity style={styles.botao} onPress={() => {}}>
            <Text style={styles.botaoTexto}>Cadastro</Text>
          </TouchableOpacity>

          
          <TouchableOpacity style={styles.botao} onPress={() => {}}>
            <Text style={styles.botaoTexto}>Sobre-Nós</Text>
          </TouchableOpacity>
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
    marginBottom: 20,
  },
  descricao: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  botao: {
    width: '100%',
    height: 50,
    backgroundColor: '#6200ee',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  botaoTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});