import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';


export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false, 
        }}
      >
      
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="conto" />
        
       
        <Stack.Screen 
          name="conto-detalhes"
          options={{
            headerShown: true,
            headerTransparent: true, 
            headerTitle: '', 
            headerTintColor: '#6200ee' 
          }}
        />
      </Stack>
    </AuthProvider>
  );
}