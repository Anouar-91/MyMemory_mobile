import React, { useState } from 'react'
import { NativeBaseProvider, Box, Text, Center, Button, Input } from "native-base";
import { StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import EnWordApi from '../api/enWordApi';
import colors from '../constants/colors';
import MyButton from '../components/basics/buttonSecondary';
import InputHookForm from '../components/basics/InputHookForm';

const ListWordScreen = () => {
  const [page, setPage] = useState(1);

  const { isLoading, error, data, isError, isPreviousData, refetch } =
    useQuery(["enWords", page], () => EnWordApi.getCollectionByUser({ page: page.toString() }), {
      //permet de conserver les données précédentes dans le cache lorsque la requête est mise à jour,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(data)
        if (data["hydra:totalItems"]) {
          console.log(data, 'success')
        }
        if (data?.code == 401) {
          //toast.warning("Votre session a expiré ! Veuillez vous reconnecter.");
        }
      },
      onError: (error) => {
        alert(
          "Nous sommes navré, mais l'application a rencontré un problème !"
        );
      },
    });
  return (
    <Box style={styles.container}>
      <Center>
        <Box style={styles.headerBox}>
          <Text style={styles.title}>List of words</Text>
          <MyButton onClick={() => console.log("test")} color={"secondary"}>New word</MyButton>
        </Box>
        <Box style={{ marginTop: 10 }}>
          <Input width="90%" />
        </Box>
        <Box>
          
        </Box>
      </Center>
    </Box>
  )
}

export default ListWordScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "15%",
  },
  headerBox: {
    padding: 10,
    width: "90%",
    borderRadius: "5px",
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontWeight: "bold"
  }
})