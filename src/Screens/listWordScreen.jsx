import React, { useRef, useState } from 'react'
import { Box, Text, Center, Input, ScrollView, Pressable, Button } from "native-base";
import { StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import EnWordApi from '../api/enWordApi';
import colors from '../constants/colors';
import MyButton from '../components/basics/buttonSecondary';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Loader from '../components/basics/loader';


const ListWordScreen = ({ navigation }) => {
  const scrollViewRef = useRef(null); // Create a ref for ScrollView

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);

  const [loadingNewWord, setLoadingNewWord] = useState(false)

  const newLimit = () => {
    setLoadingNewWord(true)
    setLimit(limit + 30)
    scrollViewRef.current.scrollToEnd();
  }

  const { isLoading, error, data, isError, isPreviousData, refetch } =
    useQuery(["enWords", page, limit], () => EnWordApi.getCollectionByUser({ page: page.toString(), "limit": limit }), {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (data["hydra:totalItems"]) {
          setLoadingNewWord(false)

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
    navigation.navigate("enWordDetail", { id: id });
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
          <Loader />
        </Center>
      )}
      <ScrollView ref={scrollViewRef}  style={{ maxHeight: "70%" }}>
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
      <Box style={{ marginTop: 10, flexDirection: "row", justifyContent: "center" }}>

        {
          loadingNewWord ? (
            <Loader />
          ) : (
            <Pressable onPress={() => newLimit()}>
              <Text style={{ color: colors.primary, fontWeight: 800 }} >Voir plus</Text>
            </Pressable>
          )
        }
      </Box>



      <Box style={{ zIndex: 9999, position: "absolute", top: 10, left: 10, right: 10 }}>
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

  },
  headerBox: {
    padding: 10,
    width: "98%",
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