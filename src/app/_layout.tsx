import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false, // Desativa header por padrão
        }}
      >
        {/* Telas sem header */}
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="conto" />
        
        {/* Tela de detalhes COM header nativo */}
        <Stack.Screen 
          name="conto-detalhes"
          options={{
            headerShown: true,
            headerTransparent: true, // Fundo transparente
            headerTitle: '', // Remove título
            headerTintColor: '#6200ee' // Cor do botão (roxo)
          }}
        />
      </Stack>
    </AuthProvider>
  );
}