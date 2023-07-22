import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Box } from "native-base";
import LoginScreen from './src/screens/loginScreen';
import theme from "./src/assets/style/theme"
import { QueryClient, QueryClientProvider } from 'react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './src/screens/registerScreen';
import ListWordScreen from './src/screens/listWordScreen';
import AddEnWordScreen from './src/screens/addEnWordScreen';
import colors from './src/constants/colors';
import EnWordDetail from './src/screens/enWordDetail';

export default function App() {
  const queryClient = new QueryClient();
  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer style={styles.container}>
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator initialRouteName="login">
            <Stack.Screen name="login" component={LoginScreen}  options={{title: "Connexion"}} />
            <Stack.Screen name="enWordDetail" component={EnWordDetail}  options={{
                title: 'Word Detail',
                headerStyle: {
                  backgroundColor: colors.primary, // Couleur de fond du header
                },
                headerTitleStyle: {
                  color: 'white', // Couleur du texte du titre
                },
                headerTintColor: 'white', // Couleur de la flèche de retour et du texte des boutons
            }} />
            <Stack.Screen name="register" component={RegisterScreen}  options={{ title: "Inscription" }}/>
            <Stack.Screen name="listWordScreen" component={ListWordScreen}  options={{headerShown: false}}/>
            <Stack.Screen name="addEnWordScreen" component={AddEnWordScreen}  options={{
                title: 'Add new word',
                headerStyle: {
                  backgroundColor: colors.primary, // Couleur de fond du header
                },
                headerTitleStyle: {
                  color: 'white', // Couleur du texte du titre
                },
                headerTintColor: 'white', // Couleur de la flèche de retour et du texte des boutons
            }}/>
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
