import axios from "axios";
import config from "../config";
import { createContext, useCallback, useState } from "react";

const AuthContext = createContext({
  auth: {
    rawJWT: null,
    decodedJWT: null
  },
  login: () => null
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const login = useCallback(async (userName, password) => {
    const resp = await axios.post(`${config.apiUrl}/api/login`, {userName, password})
    console.log(resp)
    const data = resp.data
    setAuth({
      rawJWT: data.token,
      decodedJWT: JSON.parse(atob(data.token.split(".")[1], "base64"))
    })
  }, [setAuth])

  return(
    <AuthContext.Provider value={{auth, login}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
