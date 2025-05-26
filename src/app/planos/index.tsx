import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';

const PlanosScreen = () => {
  const planos = [
    {
      id: 1,
      nome: "Premium",
      preco: "R$ 19,99/mês",
      beneficios: [
        "✓ Contos ilimitados",
        "✓ Inteligência Artificial para criar finais alternativos",
        "✓ Contos personalizados com IA",
        "✓ Download para ler offline",
        "✓ Suporte prioritário"
      ],
      corDestaque: '#6200ee'
    },
    {
      id: 2,
      nome: "Padrão", 
      preco: "R$ 9,99/mês",
      beneficios: [
        "✓ Contos ilimitados",
        "✓ Download para ler offline",
        "✓ Suporte básico"
      ],
      corDestaque: '#4CAF50'
    },
    {
      id: 3,
      nome: "Básico com anúncios",
      preco: "R$ 4,99/mês",
      beneficios: [
        "✓ Acesso a contos básicos",
        "✓ Anúncios não intrusivos",
        "✓ Leitura online"
      ],
      corDestaque: '#FF9800'
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.tituloPrincipal}>Escolha o melhor plano para você</Text>
      <Text style={styles.subtitulo}>PASSO 1 DE 2</Text>
      
      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        style={styles.carrossel}
      >
        {planos.map((plano) => (
          <View key={plano.id} style={[styles.planoCard, {borderColor: plano.corDestaque}]}>
            <View style={[styles.planoCabecalho, {backgroundColor: plano.corDestaque}]}>
              <Text style={styles.planoNome}>{plano.nome}</Text>
              <Text style={styles.planoPreco}>{plano.preco}</Text>
            </View>
            
            <View style={styles.planoBeneficios}>
              {plano.beneficios.map((item, index) => (
                <Text key={index} style={styles.beneficioItem}>{item}</Text>
              ))}
            </View>
            
            <TouchableOpacity 
              style={[styles.botaoAssinar, {backgroundColor: plano.corDestaque}]}
              onPress={() => router.push(`/carrinho/${plano.id}`)}
            >
              <Text style={styles.botaoTexto}>Assinar</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  tituloPrincipal: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333'
  },
  subtitulo: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
    fontSize: 16
  },
  carrossel: {
    flex: 1,
  },
  planoCard: {
    width: Dimensions.get('window').width - 40,
    marginRight: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  planoCabecalho: {
    padding: 20,
    alignItems: 'center'
  },
  planoNome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5
  },
  planoPreco: {
    fontSize: 18,
    color: 'white'
  },
  planoBeneficios: {
    padding: 20
  },
  beneficioItem: {
    fontSize: 16,
    marginBottom: 12,
    color: '#555'
  },
  botaoAssinar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    margin: 15,
    borderRadius: 5
  },
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 16
  }
});

export default PlanosScreen;