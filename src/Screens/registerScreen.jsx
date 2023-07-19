import React, { useState } from 'react'
import { Box,  Image, Button, Center } from "native-base";
import { StyleSheet } from 'react-native';
import HeaderOne from '../components/basics/headerOne';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm } from 'react-hook-form';
import Loader from '../components/basics/loader';
import authApi from '../api/authApi';
import { useMutation } from 'react-query';
import InputHookForm from '../components/basics/InputHookForm';
import { Select } from "native-base";
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import SelectHookForm from '../components/basics/selectHookForm';

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm()
  const onSubmit = (data) => {
    if (data.password != data.confirmPassword) {
      console.log(data.password,data.confirmPassword)
      Toast.show({
        type: 'error',
        text1: 'Les mots de passe doivent correspondre.',
        position: 'bottom',
        style: {
          zIndex: 99999999999, // Valeur de zIndex élevée pour afficher le toast au-dessus de tout
        },
      });
    } else {
      setLoading(true)
      registerMutation.mutate(data);
    }
  }

  const registerMutation = useMutation(
    (userData) => authApi.register(userData),
    {
      onSuccess: (data) => {
        setLoading(false);
        console.log(data)
        if(data["hydra:description"]== "email: Il existe déjà un utilisateur avec cet email."){
          Toast.show({
            type: 'error',
            text1: 'Cet email est déjà utilisé !',
            position: 'bottom',
            style: {
              zIndex: 99999999999, // Valeur de zIndex élevée pour afficher le toast au-dessus de tout
            },
          });
        }
        if(data.id){
          navigation.navigate('login')
          Toast.show({
            type: 'success',
            text1: 'Inscription avec succès !',
            text2: "Vous pouvez vous connecter",
            position: 'bottom',
          });
        }
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
      <Toast />

      <KeyboardAwareScrollView >

        <Center>
          <Box style={{ height: 30, marginTop: "20%" }}>
            <Image
              source={require('./../assets/img/logo.png')}
              alt={"2 children"}
              height={75}
              width={75}
              style={{ borderRadius: 10 }}
            />
          </Box>
        </Center>


        <Box style={styles.container}>
          <Center>
            <HeaderOne>Je m'inscris</HeaderOne>
            <Box style={{ width: "90%" }}>
              <InputHookForm isError={errors.firstname} control={control} name={"firstname"} placeholder={"Prénom"} />
              <InputHookForm isError={errors.lastname} control={control} name={"lastname"} placeholder={"Nom"} />
              <InputHookForm isError={errors.email} control={control} name={"email"} placeholder={"Votre email"} />
              <InputHookForm isError={errors.password} control={control} name={"password"} type={"password"} placeholder={"Mot de passe"} />
              <InputHookForm isError={errors.confirmPasword} control={control} name={"confirmPassword"} type={"password"} placeholder={"Confirmer votre mot de passe"} />
              <SelectHookForm placeholder="Sexe" name={"gender"} control={control}>
                <Select.Item label="Homme" value="Male" />
                <Select.Item label="Femme" value="Female" />
              </SelectHookForm>
              {loading ?
                <Loader />
                : (
                  <Button type={"submit"} onPress={handleSubmit(onSubmit)} >Inscription</Button>
                )
              }
            </Box>
          </Center>
        </Box>
      </KeyboardAwareScrollView>
    </>
  )
}

export default RegisterScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: "20%"
  },
})