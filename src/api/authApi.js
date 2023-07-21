import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import jwtDecode from 'jwt-decode';

async function login(userData) {
  const response = await fetch(
    Constants.manifest.extra.API_URL + "login_check",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  ).then(res => res.json());

  return response;
}

async function register(userRegister) {
  const response = await fetch(Constants.manifest.extra.API_URL+ "users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userRegister),
  }).then((res) => res.json());
  console.log(response, "la")
  return response;
}

async function isAuthenticated() {
  const token = await AsyncStorage.getItem('token');
  console.log("avant le if")
    if (token) {
      const jwtData = jwtDecode(token);
      if (jwtData.exp * 1000 > new Date().getTime()) {
        console.log("already valid")
        return true;
      } else {
        console.log("return else")

        return false;
      }
    } else {

      console.log("return false")
      return false;
    }
}


export default {
  login,
  register,
  isAuthenticated
};
