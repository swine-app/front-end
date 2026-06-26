import axios from "axios";
import config from "../config";
import { createContext, useCallback, useState, useEffect } from "react";

const AuthContext = createContext({
  auth: null,
  login: () => null
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')));

  const login = useCallback(async (userName, password) => {
    const resp = await axios.post(`${config.apiUrl}/api/login`, { userName, password })
    const data = resp.data
    const thisAuth = {
      rawJWT: data.token,
      decodedJWT: JSON.parse(atob(data.token.split(".")[1], "base64"))
    }
    setAuth(thisAuth)
    localStorage.setItem('auth', JSON.stringify(thisAuth));
  }, [setAuth])

  const demoLogin = useCallback(() => {
    const demoPayload = { admin: true, id: 1 };
    const demoAuth = {
      rawJWT: `demo.${btoa(JSON.stringify(demoPayload))}.demo`,
      decodedJWT: demoPayload,
    };
    setAuth(demoAuth);
    localStorage.setItem("auth", JSON.stringify(demoAuth));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth");
    setAuth(null);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, demoLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
