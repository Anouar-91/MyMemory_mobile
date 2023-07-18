import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Box } from "native-base";
import Tabs from './src/navigation/tabs';
import LoginScreen from './src/screens/loginScreen';
import theme from "./src/assets/style/theme"
import { QueryClient, QueryClientProvider } from 'react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './src/screens/registerScreen';

export default function App() {
  const queryClient = new QueryClient();
  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer style={styles.container}>
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator initialRouteName="login">
            <Stack.Screen name="login" component={LoginScreen}  options={{ headerShown: false }} />
            <Stack.Screen name="register" component={RegisterScreen}  options={{ headerShown: false }}/>
          </Stack.Navigator>
        </QueryClientProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
