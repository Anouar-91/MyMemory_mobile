import React, { useState } from 'react'
import { Box, Text, Center, Input, ScrollView, Pressable } from "native-base";
import { StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import EnWordApi from '../api/enWordApi';
import colors from '../constants/colors';
import MyButton from '../components/basics/buttonSecondary';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Loader from '../components/basics/loader';

const ListWordScreen = ({ navigation }) => {
  const [page, setPage] = useState(1);

  const { isLoading, error, data, isError, isPreviousData, refetch } =
    useQuery(["enWords", page], () => EnWordApi.getCollectionByUser({ page: page.toString(), "limit": "999999" }), {
      //permet de conserver les données précédentes dans le cache lorsque la requête est mise à jour,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (data["hydra:totalItems"]) {
        }
        if (data?.code == 401) {
          navigation.navigate('login')
        }
      },
      onError: (error) => {
        alert(
          "Nous sommes navré, mais l'application a rencontré un problème !"
        );
      },
    });

    const goToWordDetail = (id) => {
      navigation.navigate("enWordDetail", {id: id});
    }
  
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
      {isLoading && (
        <Center>
          <Loader/>
        </Center>
      )}
      <ScrollView>
        <Box >
          {data &&
            data["hydra:member"] &&
            data["hydra:member"].map((enWord) => {
              return (
                <>
                <Pressable onPress={() => goToWordDetail(enWord.id)}>
                  <Box key={enWord.id} style={styles.wordContainer}>
                    <Box style={styles.leftText}>
                      <Text>{enWord.content}</Text>
                    </Box>
                    <Box style={styles.rightText}>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Text>
                          {enWord.frWords.map((frWord, index) => {
                            // Add a comma after each translation except for the last one
                            return (
                              <Text key={frWord.id}>
                                {frWord.content}
                                {index !== enWord.frWords.length - 1 ? ", " : ""}
                              </Text>
                            );
                          })}
                        </Text>
                      </ScrollView>
                    </Box>
                  </Box>
                  </Pressable>
                  <Box style={{ padding: 0.5, backgroundColor: "black", width: "90%" }}></Box>
                </>

              );
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
    paddingHorizontal: 10, // Add horizontal padding
    justifyContent: "center", // Center the content vertically

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
  },
  wordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    // Add the following styles to prevent overflow and word wrapping
    flexWrap: "wrap",
    overflow: "hidden",
  },
  leftText: {
    flex: 1, // Take up the available space in the row
    textAlign: "center", // Center the text horizontally

  },
  rightText: {
    flex: 1, // Take up the available space in the row
    textAlign: "center", // Align text to the right
  },
})