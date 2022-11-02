import axios from "axios";
import config from "../config";
import { createContext, useCallback, useState, useEffect } from "react";

const AuthContext = createContext({
  auth: null,
  login: () => null
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);


  useEffect(() => {
    // window.addEventListener('storage', (event) => {
    //   console.log(event);
    //   if (event.storageArea === localStorage && event.key === 'auth') {
    //     setLocalAuth(JSON.parse(localStorage.getItem('auth')));
    //   }
    // });
    if (localStorage.key("auth")) {
      console.debug("Restoring Session")
      setAuth(JSON.parse(localStorage.getItem('auth')))
    }
  }, []);

  //Store session in browser
  useEffect(() => {
    if (auth) {
      console.debug("Saving Session")
      localStorage.setItem('auth', JSON.stringify(auth));
    }
  }, [auth])


  const login = useCallback(async (userName, password) => {
    const resp = await axios.post(`${config.apiUrl}/api/login`, {userName, password})
    const data = resp.data
    setAuth({
      rawJWT: data.token,
      decodedJWT: JSON.parse(atob(data.token.split(".")[1], "base64"))
    })
  }, [setAuth])

  const logout = useCallback(() => {
    localStorage.removeItem("auth");
    setAuth(null);
  }, []);

  return(
    <AuthContext.Provider value={{auth, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
