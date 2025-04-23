import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, useMemo } from 'react';


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
    
    
    if (fim === inicio) {
      fim = inicio + caracteresPorPagina;
    }
    
    paginas.push(texto.substring(inicio, fim).trim());
    inicio = fim;
  }
  
  return paginas;
};


const textosContos = {
  1: {
    titulo: "A Floresta Encantada",
    texto: `Era uma vez, em uma floresta onde os animais falavam e as árvores guardavam segredos milenares. A luz do sol filtrada pelas folhas criava padrões dourados no chão de musgo, e o ar estava sempre perfumado com o cheiro de flores silvestres.

    Nessa floresta encantada, vivia uma jovem chamada Elara, que possuía o dom de entender a linguagem dos animais. Um dia, enquanto caminhava pelos bosques, ouviu um chamado de socorro vindo de uma antiga árvore carvalho.
    
    Ao se aproximar, descobriu que era um esquilo preso entre os galhos. "Por favor, me ajude!", gritava o pequeno animal. Elara cuidadosamente libertou o esquilo, que em agradecimento sussurrou: "A floresta está em perigo. O antigo equilíbrio está se rompendo."
    
    Elara não entendeu completamente o aviso, mas nos dias seguintes começou a notar mudanças. As árvores pareciam mais silenciosas, os animais mais ariscos. Até que numa manhã, encontrou uma área onde as plantas estavam murchas e cinzentas, como se algo tivesse sugado sua vida.
    
    Determinada a descobrir a causa, Elara seguiu os conselhos do esquilo e partiu em direção ao coração da floresta, onde diziam existir uma árvore anciã que guardava os segredos mais profundos da natureza.`,
    imagens: [
      require('@/assets/conto1.jpg'),
      require('@/assets/conto1.jpg')
    ]
  },
  2: {
    titulo: "O Castelo do Tempo", 
    texto: `Em uma noite de tempestade, o jovem Arthur descobriu um castelo que não aparecia em nenhum mapa. As paredes de pedra pareciam pulsar com energia, e os corredores se estendiam em direções impossíveis.
    
    Arthur era um estudante de história que estava visitando a pequena vila de Blackwood para pesquisar sobre lendas locais. Ninguém acreditava quando ele contou sobre o castelo que aparecia apenas durante tempestades elétricas.
    
    Na sua segunda visita ao castelo, Arthur encontrou um relógio antigo com doze ponteiros, cada um marcando uma era diferente. Ao tocá-lo, foi transportado para a Inglaterra medieval, onde descobriu que era o único que podia consertar uma ruptura no tecido do tempo.
    
    Cada visita ao castelo revelava novos mistérios. Arthur descobriu que os antigos habitantes do castelo eram guardiões do tempo, e que agora essa responsabilidade havia recaído sobre ele. O desafio era maior do que imaginava - alguém ou algo estava tentando reescrever a história.`,
    imagens: [
      require('@/assets/conto2.jpg'),
      require('@/assets/conto2.jpg')
    ]
  },
  3: {
    titulo: "A Ilha Perdida",
    texto: `O navio naufragou em águas desconhecidas, levando os sobreviventes para uma ilha que mudava a cada lua cheia. Marco, o capitão, foi o primeiro a notar as estranhas formações rochosas que pareciam se rearranjar durante a noite.
    
    Os dez sobreviventes logo descobriram que a ilha não obedecia às leis normais da natureza. Plantas cresciam em questão de horas, a água das fontes tinha propriedades curativas, e às vezes ouviam música vinda do centro da ilha, onde um denso nevoeiro sempre pairava.
    
    Na segunda semana, encontraram os diários de um explorador do século XVIII que descrevia a mesma ilha, mas com geografia completamente diferente. Ele escrevia sobre um portal que levava a diferentes versões da ilha, cada uma com seus próprios perigos e maravilhas.
    
    Quando Marco e sua tripulação finalmente encontraram o portal, enfrentaram uma escolha impossível: voltar para casa ou explorar os mistérios da ilha. A decisão que tomariam mudaria não apenas seus destinos, mas o próprio equilíbrio da ilha mágica.`,
    imagens: [
      require('@/assets/conto3.jpg'),
      require('@/assets/conto3.jpg')
    ]
  }
};

export default function ContoDetalhesScreen() {
  const params = useLocalSearchParams();
  const contoId = Number(params.contoId);
  const conto = textosContos[contoId as keyof typeof textosContos];
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

 
  const paginas = useMemo(() => dividirTexto(conto.texto), [conto.texto]);
  const totalPages = paginas.length;

  const handleImageScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / (Dimensions.get('window').width - 56));
    setActiveImageIndex(newIndex);
  };

  return (
    <ImageBackground 
      source={require('@/assets/background2.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#6200ee" />
      </TouchableOpacity>

      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>{conto.titulo}</Text>
        
        <View>
          <ScrollView 
            horizontal 
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.galeria}
            onScroll={handleImageScroll}
            scrollEventThrottle={16}
          >
            {conto.imagens.map((imagem, index) => (
              <Image 
                key={index} 
                source={imagem} 
                style={styles.imagemConto} 
                resizeMode="contain"
              />
            ))}
          </ScrollView>
          
          <View style={styles.indicadoresGaleria}>
            {conto.imagens.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.indicadorGaleria,
                  activeImageIndex === index && styles.indicadorGaleriaAtivo
                ]} 
              />
            ))}
          </View>
        </View>
        
        <View style={styles.textoContainer}>
          <Text style={styles.textoConto}>
            {paginas[currentPage - 1]}
          </Text>
          
          <View style={styles.marcadorPagina}>
            <TouchableOpacity 
              onPress={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <Ionicons 
                name="chevron-back" 
                size={24} 
                color={currentPage === 1 ? '#ccc' : '#6200ee'} 
              />
            </TouchableOpacity>
            
            <Text style={styles.marcadorPaginaTexto}>
              Página {currentPage} de {totalPages}
            </Text>
            
            <TouchableOpacity 
              onPress={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <Ionicons 
                name="chevron-forward" 
                size={24} 
                color={currentPage === totalPages ? '#ccc' : '#6200ee'} 
              />
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