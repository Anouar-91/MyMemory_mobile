import React, { useEffect, useState } from 'react'
import { Box, Text, Image, Button, Center } from "native-base";
import { StyleSheet, View, Pressable } from 'react-native';
import HeaderOne from '../components/basics/headerOne';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller, useForm } from 'react-hook-form';
import Loader from '../components/basics/loader';
import authApi from '../api/authApi';
import { useMutation } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputHookForm from '../components/basics/InputHookForm';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import ToastBottom from '../components/toastBottom';

const LoginScreen = ({ navigation }) => {

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuthenticated = await authApi.isAuthenticated();
        if (isAuthenticated) {
          navigation.navigate('listWordScreen');
        }
      } catch (error) {
        console.log(error)
      }
    };

    checkAuthentication();
  }, []);

  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  })
  const onSubmit = (data) => {
    setLoading(true)
    loginMutation.mutate(data);
  }

  const loginMutation = useMutation(
    (userData) => authApi.login(userData),
    {
      onSuccess: (data) => {
        if (data.token) {
          AsyncStorage.setItem('token', data.token).then(() => {
            console.log('Token sauvegardé avec succès !');
          });
          navigation.navigate("listWordScreen")
          Toast.show({
            type: 'success',
            text1: 'Connexion réussi !',
            position: 'top',
          });
        } else if (data.code == "401") {
          Toast.show({
            type: 'error',
            text1: 'Identifiants invalide !',
            position: 'top',

          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Erreur',
          });
        }
        setLoading(false);
      },
      onError: (error) => {
        setLoading(false);
        alert(
          "Nous sommes navré, mais l'application a rencontré un problème !"
        );
      },
    }
  );
  return (
    <>

      <KeyboardAwareScrollView >
        <Box style={{ zIndex: 9999, position: "absolute", Top: 10, left: 10, right: 10 }}>
          <Toast />
        </Box>

        <Box style={styles.container}>
          <Center>
            <Box style={{ marginTop: "30%" }}>
              <Image
                source={require('./../assets/img/home-illustration.png')}
                alt={"2 children"}
                height={"100%"}
              />
            </Box>
            <HeaderOne width={40}>Je me connecte</HeaderOne>
            <Box style={{ width: "90%" }}>
              <InputHookForm isError={errors.username} control={control} name={"username"} placeholder={"Votre email"} />
              <InputHookForm isError={errors.password} control={control} name={"password"} placeholder={"********"} />
              {loading ?
                <Loader />
                : (
                  <Button onPress={handleSubmit(onSubmit)} >Connexion</Button>
                )
              }
            </Box>
            <Box marginTop={4} marginBottom={4} padding={"0.5px"} bg={"black"} width={"90%"}></Box>
            <Button onPress={() => navigation.navigate('register')} bg="secondary.800" width={"90%"}>S'inscire</Button>
          </Center>
        </Box>
      </KeyboardAwareScrollView>
    </>
  )
}

export default LoginScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})