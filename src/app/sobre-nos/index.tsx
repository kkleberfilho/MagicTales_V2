import { View, Text, ScrollView, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function SobreScreen() {
  return (
    <ImageBackground 
      source={require('@/assets/background2.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Link href=".." asChild>
            <TouchableOpacity style={styles.backButton}>
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          </Link>

          <Text style={styles.title}>Sobre o MagicTales</Text>
          
          <Text style={styles.description}>
            O MagicTales é um aplicativo desenvolvido para amantes de histórias...
          </Text>
          
          
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
    padding: 20,
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
  },
  backButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    marginBottom: 20,
    lineHeight: 24,
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
    lineHeight: 20,
  },
});