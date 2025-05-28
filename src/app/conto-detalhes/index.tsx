import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firebaseFirestore } from '@/config/firebaseConfig';

const dividirTexto = (texto: string, caracteresPorPagina = 500) => {
  const paginas = [];
  let inicio = 0;

  while (inicio < texto.length) {
    let fim = inicio + caracteresPorPagina;
    if (fim < texto.length) {
      while (fim > inicio && texto[fim] !== ' ' && texto[fim] !== '\n') {
        fim--;
      }
    }
    if (fim === inicio) fim = inicio + caracteresPorPagina;
    paginas.push(texto.substring(inicio, fim).trim());
    inicio = fim;
  }

  return paginas;
};

// função para pegar imagem local com base no ID
const getImagensLocais = (id: string) => {
  const imagens: { [key: string]: any[] } = {
    '1': [require('@/assets/conto1.jpg'), require('@/assets/conto1.jpg')],
    '2': [require('@/assets/conto2.jpg'), require('@/assets/conto2.jpg')],
    '3': [require('@/assets/conto3.jpg'), require('@/assets/conto3.jpg')],
  };
  return imagens[id] || [];
};

export default function ContoDetalhesScreen() {
  const params = useLocalSearchParams();
  const contoId = String(params.contoId);

  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [loading, setLoading] = useState(true);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchConto = async () => {
      try {
        const docRef = doc(firebaseFirestore, 'contos', contoId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {

          const data = docSnap.data();

          setTitulo(data.titulo);
          setConteudo(data.conteudo);
        } else {
          console.warn('Conto não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar conto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConto();
  }, [contoId]);

  const paginas = useMemo(() => dividirTexto(conteudo), [conteudo]);
  const totalPages = paginas.length;
  const imagens = getImagensLocais(contoId);

  const handleImageScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / (Dimensions.get('window').width - 56));
    setActiveImageIndex(newIndex);
  };

  if (loading) {
    return (
      <View style={[styles.background, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <ImageBackground source={require('@/assets/background2.jpg')} style={styles.background} resizeMode="cover">
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#6200ee" />
      </TouchableOpacity>

      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>{titulo}</Text>

        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.galeria}
            onScroll={handleImageScroll}
            scrollEventThrottle={16}
          >
            {imagens.map((imagem, index) => (
              <Image key={index} source={imagem} style={styles.imagemConto} resizeMode="contain" />
            ))}
          </ScrollView>

          <View style={styles.indicadoresGaleria}>
            {imagens.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicadorGaleria,
                  activeImageIndex === index && styles.indicadorGaleriaAtivo,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.textoContainer}>
          <Text style={styles.textoConto}>{paginas[currentPage - 1]}</Text>

          <View style={styles.marcadorPagina}>
            <TouchableOpacity onPress={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}>
              <Ionicons name="chevron-back" size={24} color={currentPage === 1 ? '#ccc' : '#6200ee'} />
            </TouchableOpacity>

            <Text style={styles.marcadorPaginaTexto}>
              Página {currentPage} de {totalPages}
            </Text>

            <TouchableOpacity onPress={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}>
              <Ionicons name="chevron-forward" size={24} color={currentPage === totalPages ? '#ccc' : '#6200ee'} />
            </TouchableOpacity>
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
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 12,
    borderRadius: 10,
    padding: 16,
    marginTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    marginBottom: 20,
  },
  galeria: {
    height: 250,
    marginBottom: 10,
  },
  imagemConto: {
    width: Dimensions.get('window').width - 56,
    height: '100%',
  },
  textoContainer: {
    paddingHorizontal: 8,
  },
  textoConto: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
  },
  indicadoresGaleria: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  indicadorGaleria: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  indicadorGaleriaAtivo: {
    backgroundColor: '#6200ee',
  },
  marcadorPagina: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  marcadorPaginaTexto: {
    marginHorizontal: 15,
    color: '#6200ee',
    fontWeight: 'bold',
  },
});
