import jwtDecode from "jwt-decode";

async function login(userData) {
  const response = await fetch(
    "https://mymemory-api.fr/api/" + "login_check",
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
  const response = await fetch("https://mymemory-api.fr/api/"+ "users", {
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
