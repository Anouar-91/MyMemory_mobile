import { Box, Center, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import enWordApi from '../api/enWordApi';
import Loader from '../components/basics/loader';
import { StyleSheet } from 'react-native';

const EnWordDetail = ({navigation, route}) => {
    const [id, setId] = useState();
    useEffect(() =>{
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
  if(isLoading){
    return (
        <Loader/>
    )
  }
  return (
    <>
    <Box>
        <Center>
            <Box style={styles.titleContainer}>
                <Text style={styles.title}>{data.content}</Text>
            </Box>
            <Box style={{ padding: 0.5, backgroundColor: "black", width: "90%" }}></Box>
        </Center>

    </Box>
    </>
  )
}

export default EnWordDetail
const styles = StyleSheet.create({
    title:{
        fontSize: 20
    },
    titleContainer: {
        marginTop: 10
    }
})