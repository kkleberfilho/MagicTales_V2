import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Plano = {
  nome: string;
  preco: number;
};

const CarrinhoScreen = () => {
  const { id } = useLocalSearchParams();
  
 
  const planos: Record<string, Plano> = {
    "1": { nome: "Premium", preco: 19.99 },
    "2": { nome: "Padrão", preco: 9.99 },
    "3": { nome: "Básico com anúncios", preco: 4.99 }
  };


  const plano = id && typeof id === 'string' ? planos[id] : planos["1"];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo da Assinatura</Text>
      
      <View style={styles.resumeContainer}>
        <Text style={styles.planoNome}>{plano.nome}</Text>
        <Text style={styles.planoPreco}>R$ {plano.preco.toFixed(2)}/mês</Text>
      </View>

      <View style={styles.detalhes}>
        <Text style={styles.detalheItem}>✓ Contos ilimitados</Text>
        <Text style={styles.detalheItem}>✓ Acesso em múltiplos dispositivos</Text>
        {id === '1' && <Text style={styles.detalheItem}>✓ Recursos de IA inclusos</Text>}
      </View>

      <TouchableOpacity
        style={styles.botaoFinalizar}
        onPress={() => router.push("/pagamento/sucesso")}
      >
        <Text style={styles.botaoTexto}>Finalizar Compra</Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333'
  },
  resumeContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  planoNome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 5
  },
  planoPreco: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15
  },
  detalhes: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
    marginBottom: 20
  },
  detalheItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10
  },
  botaoFinalizar: {
    backgroundColor: '#6200ee',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    marginTop: 20
  },
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10
  }
});

export default CarrinhoScreen;