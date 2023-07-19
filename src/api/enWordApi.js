import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getCollectionByUser = async (params) => {
  const queryParams = new URLSearchParams(params).toString();
  const token = await AsyncStorage.getItem('token');
  
  const response = await fetch(
    Constants.manifest.extra.API_URL + "en_words?" + queryParams,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.json();
};


export default {
  getCollectionByUser
};
