import React from 'react'
import { NativeBaseProvider, Box , Text} from "native-base";
import { StyleSheet, View, Pressable } from 'react-native';
import HeaderOne from '../Components/Basics/HeaderOne';


const LoginScreen = () => {
  return (
    <Box style={styles.container}>
        <HeaderOne width={40}>Je me connecte</HeaderOne>
    </Box>
  )
}

export default LoginScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})