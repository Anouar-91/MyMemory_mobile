import React from 'react'
import { NativeBaseProvider, Box , Text, Image, Button} from "native-base";
import { StyleSheet, View, Pressable } from 'react-native';
import HeaderOne from '../components/basics/headerOne';

import MyInput from '../components/basics/input';

const LoginScreen = () => {
  return (
    <Box style={styles.container}>
        <Image 
        source={require('./../assets/img/home-illustration.png')}
        width={"100%"} 
        height={"50%"} 
        alt={"2 children"}
        />
        
        <HeaderOne width={40}>Je me connecte</HeaderOne>
        <Box style={{width:"90%"}}>
          <MyInput placeholder='anouar@hotmail.com'/>
          <MyInput placeholder='*********'/>
          <Button>Connexion</Button>
        </Box>
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