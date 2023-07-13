import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Box } from "native-base";
import Tabs from './src/navigation/tabs';
import LoginScreen from './src/screens/loginScreen';
import theme from "./src/assets/style/theme"

export default function App() {

  return (
      <NativeBaseProvider theme={theme}>
         <NavigationContainer>
            <LoginScreen />
          </NavigationContainer>
      </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "black",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
