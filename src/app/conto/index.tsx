import { Text, View, StyleSheet, ActivityIndicator, ImageBackground, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Redirect, router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useRef, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { authService, Conto } from '@/services/authService';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.7;
const CARD_MARGIN = 10;
const CARD_TOTAL_WIDTH = CARD_WIDTH + CARD_MARGIN * 2;



export default function ContoScreen() {
  const { isAuthenticated } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [contos, setContos] = useState<Conto[] | null>(null);
  const [loading, setLoading] = useState(true);
  const netInfo = useNetInfo();

  // Corrigido: Tipagem explícita do índice numérico
  const imagesMap: { [key: string]: any } = {
    1: require('@/assets/conto1.jpg'),
    2: require('@/assets/conto2.jpg'),
    3: require('@/assets/conto3.jpg'),
  };

  useEffect(() => {
    const fetchContos = async () => {
      try {
        const fetchedContos = await authService.getContos();
        setContos(fetchedContos);
      } catch (error) {
        console.error("Erro ao carregar contos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContos();
  }, []);

  if (isAuthenticated === false) {
    return <Redirect href="/login" />;
  }
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / CARD_TOTAL_WIDTH);
    setActiveIndex(newIndex);
  };

  if (!contos || contos.length === 0) {
    return (
      <View style={styles.background}>
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Nenhum conto disponível.</Text>
      </View>
    );
  }

  return (
    <ImageBackground 
      source={require('@/assets/background2.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <TouchableOpacity 
        style={styles.profileButton}
        onPress={() => router.push('/perfil')}
      >
        <Ionicons name="person" size={24} color="#6200ee" />
      </TouchableOpacity>
      

      {!netInfo.isConnected && (
        <View>
          <Text>Conecte-se à internet para carregar os contos</Text>
        </View>
      )}

      <View style={styles.compactContainer}>
        
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.carouselContainer}
        >
          {contos.map((conto) => (
            <View key={conto.id} style={styles.card}>
              <Image source={imagesMap[conto.id]} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{conto.titulo}</Text>
                <Text style={styles.cardDescription}>{conto.descricao}</Text>
                <TouchableOpacity 
                  style={styles.cardButton}
                  onPress={() => router.push({
                    pathname: "/conto-detalhes",
                    params: { 
                      contoId: conto.id,
                      titulo: conto.titulo,
                      descricao: conto.descricao,
                      conteudo: conto.conteudo 
                    }
                  })}
                >
                  <Text style={styles.cardButtonText}>Ler Agora</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.indicatorsContainer}>
          {contos.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.indicator,
                activeIndex === index && styles.activeIndicator
              ]}
            />
          ))}
        </View>

        <TouchableOpacity 
          style={styles.planoButton}
          onPress={() => router.push('/planos')}
        >
          <Text style={styles.planoButtonText}>VER PLANOS</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactContainer: {
    flex: 1,
    marginTop: 80,
    maxWidth: 400,
    width: '100%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    marginBottom: 10,
  },
  carouselContainer: {
    paddingHorizontal: CARD_MARGIN,
  },
  card: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_MARGIN,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  cardButton: {
    marginTop: 'auto',
    backgroundColor: '#6200ee',
    paddingVertical: 8,
    borderRadius: 8,
  },
  cardButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  indicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#6200ee',
  },
  planoButton: {
    backgroundColor: '#fff',
    borderColor: '#6200ee',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  planoButtonText: {
    textAlign: 'center',
    color: '#6200ee',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    elevation: 4,
  },
});
