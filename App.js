import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Box } from "native-base";
import Tabs from './src/Navigation/tabs';
import LoginScreen from './src/Screens/loginScreen';


export default function App() {

  return (
      <NativeBaseProvider>
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
