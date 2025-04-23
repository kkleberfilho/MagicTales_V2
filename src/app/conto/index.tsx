import { Text, View, StyleSheet, ActivityIndicator, ImageBackground, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Redirect, router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.7; 
const CARD_MARGIN = 10;
const CARD_TOTAL_WIDTH = CARD_WIDTH + CARD_MARGIN * 2;

export default function ContoScreen() {
  const { isAuthenticated } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const contos = [
    {
      id: 1,
      title: "A Floresta Encantada",
      description: "Uma aventura mágica pela floresta onde animais falam e árvores escondem segredos.",
      image: require('@/assets/conto1.jpg')
    },
    {
      id: 2,
      title: "O Castelo do Tempo",
      description: "Viaje no tempo para desvendar os mistérios de um castelo que existe em todas as eras.",
      image: require('@/assets/conto2.jpg')
    },
    {
      id: 3,
      title: "A Ilha Perdida",
      description: "Explore uma ilha misteriosa onde a geografia muda a cada lua cheia.",
      image: require('@/assets/conto3.jpg')
    }
  ];

  if (isAuthenticated === false) {
    return <Redirect href="/login" />;
  }

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / CARD_TOTAL_WIDTH);
    setActiveIndex(newIndex);
  };

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

      
      <View style={styles.compactContainer}>
        <Text style={styles.title}>Escolha seu Conto</Text>
        
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
              <Image source={conto.image} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{conto.title}</Text>
                <Text style={styles.cardDescription}>{conto.description}</Text>
                <TouchableOpacity 
                  style={styles.cardButton}
                  onPress={() => router.push({
                    pathname: "/conto-detalhes",
                    params: { 
                      contoId: conto.id,
                      titulo: conto.title,
                      imagem: conto.image,
                      descricao: conto.description 
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
  
  compactContainer: {
    flex: 1,
    justifyContent: 'center',
    top: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    margin: 12, 
    borderRadius: 10,
    padding: 16, 
    marginTop: 60,
    maxHeight: '70%', 
  },
  title: {
    fontSize: 22, 
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 20, 
    textAlign: 'center',
  },
  profileButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  carouselContainer: {
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_MARGIN,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10, 
  },
  cardImage: {
    width: '100%',
    height: CARD_WIDTH * 0.6, 
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  cardButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cardButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  indicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#6200ee',
  },
});