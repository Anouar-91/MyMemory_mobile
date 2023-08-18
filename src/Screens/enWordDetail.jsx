import { Box, Center, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import enWordApi from '../api/enWordApi';
import Loader from '../components/basics/loader';
import { StyleSheet } from 'react-native';

const EnWordDetail = ({ navigation, route }) => {
  const [id, setId] = useState();
  useEffect(() => {
    setId(route.params?.id)
  }, [route.params?.id])


  const { isLoading, error, data, isError, isPreviousData, refetch } =
    useQuery(["enWordDetail", id], () => enWordApi.get(route.params?.id), {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(data)
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
  if (isLoading) {
    return (
      <Loader />
    )
  }
  return (
    <>
      <Box style={styles.container}>
        <Center>
          <Box style={styles.titleContainer}>
            <Text style={styles.title}>{data.content}</Text>
          </Box>
          <Box style={{ padding: 0.5, backgroundColor: "black", width: "90%" }}></Box>
        </Center>
        {data.description && (
          <>
            <Box style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap", }}>
              <Text style={{ fontWeight: "bold" }}>Description :</Text>
            </Box>
            <Box>
              <Text> {data.description}</Text>
            </Box>
          </>
        )}

        <Box style={{ marginTop: 10, flexDirection: "column", flexWrap: "wrap", }}>
          <Box>
            <Text style={{ fontWeight: "bold" }}>Traduction(s) :</Text>
          </Box>
          <Box>
            {data.frWords.map((frWord, index) => {
              // Add a comma after each translation except for the last one
              return (
                <Box key={frWord.id}>
                  <Text >
                    - {frWord.content} {frWord.description ? `(${frWord.description})` : ""}
                    {index !== data.frWords.length - 1 ? ", " : ""}
                  </Text>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default EnWordDetail
const styles = StyleSheet.create({
  title: {
    fontSize: 20
  },
  titleContainer: {
    marginTop: 10
  },
  container: {
    flex: 1,
    padding: 10
  }
})