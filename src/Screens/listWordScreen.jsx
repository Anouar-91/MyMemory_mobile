import React, { useState } from 'react'
import { NativeBaseProvider, Box, Text, Center, Button, Input, ScrollView } from "native-base";
import { StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import EnWordApi from '../api/enWordApi';
import colors from '../constants/colors';
import MyButton from '../components/basics/buttonSecondary';
import InputHookForm from '../components/basics/InputHookForm';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import ToastBottom from '../components/toastBottom';

const ListWordScreen = ({ navigation }) => {
  const [page, setPage] = useState(1);

  const { isLoading, error, data, isError, isPreviousData, refetch } =
    useQuery(["enWords", page], () => EnWordApi.getCollectionByUser({ page: page.toString(), "limit": "999999" }), {
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
      <Toast />
      <Center>
        <Box style={styles.headerBox}>
          <Text style={styles.title}>List of words</Text>
          <MyButton onClick={() => navigation.navigate("addEnWordScreen")} color={"secondary"}>New word</MyButton>
        </Box>
        <Box style={{ marginTop: 10 }}>
          <Input width="90%" />
        </Box>
      </Center>
      <ScrollView>
      <Box style={{}}>
        {data && data["hydra:member"] && data["hydra:member"].map((enWord) => {
          return (
            <Box>
              <Box style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
                <Box>
                  <Text>{enWord.content}</Text>
                </Box>
                <Box></Box>
                <Box>
                  <Text>{enWord.frWords.map((frWord) => {
                    return(
                      <Text>{frWord.content},</Text>
                    )
                  })}</Text>
                </Box>
              </Box>
              <Center>
                <Box style={{ width: "90%", padding: 0.5, backgroundColor: "black" }}></Box>
              </Center>
            </Box>
          )
        })}

      </Box>
      </ScrollView>


      <Box style={{ zIndex: 9999, position: "absolute", bottom: 10, left: 10, right: 10 }}>
        <Toast />
      </Box>

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