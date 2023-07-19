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
  console.log(userRegister, "la")
  const response = await fetch(Constants.manifest.extra.API_URL+ "users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userRegister),
  }).then((res) => res.json());
  return response;
}


export default {
  login,
  register
};
