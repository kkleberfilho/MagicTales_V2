import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TelaLogin from './src/app/login';
import TelaCadastro from '@/app/cadastro';
import TelaPerfil from '@/app/perfil';
import TelaHome from '@/app';
import TelaSobre from '@/app/sobre-nos';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <TelaHome/> */}
      {/* <TelaLogin /> */}
      {/* <TelaCadastro /> */}
      {/* <TelaPerfil/> */}
      <TelaSobre/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});