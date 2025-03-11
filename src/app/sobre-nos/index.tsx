import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';

export default function TelaSobre() {
  return (
    <ImageBackground
      source={require('@/assets/background2.jpg')} 
      resizeMode="cover" 
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          
          <Text style={styles.titulo}>Sobre o MagicTales</Text>

          
          <Text style={styles.descricao}>
            O MagicTales é um aplicativo desenvolvido para amantes de histórias e contos.
            Aqui você pode explorar uma vasta coleção de histórias incríveis, conectar-se
            com outros usuários e até mesmo criar e compartilhar suas próprias aventuras.
          </Text>

          
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitulo}>Funcionalidades:</Text>
            <Text style={styles.infoTexto}>
              - Leia histórias de diversos gêneros.
              - Conecte-se com outros usuários.
              - Crie e compartilhe suas próprias histórias.
              - Personalize sua experiência de leitura.
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitulo}>Versão:</Text>
            <Text style={styles.infoTexto}>1.0.0</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitulo}>Contato:</Text>
            <Text style={styles.infoTexto}>
              Para dúvidas ou sugestões, entre em contato:
              suporte@magictales.com
            </Text>
          </View>
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    marginBottom: 20,
  },
  descricao: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 5,
  },
  infoTexto: {
    fontSize: 14,
    color: '#333',
    textAlign: 'justify',
  },
});