import Constants from 'expo-constants';

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

    if (token) {
      const jwtData = jwtDecode<any>(token);
      if (jwtData.exp * 1000 > new Date().getTime()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
}


export default {
  login,
  register,
  isAuthenticated
};
