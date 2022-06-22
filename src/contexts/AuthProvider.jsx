import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN_API } from "../ApiServices";

const AuthProviderContext = createContext();

export function useAuthProvider() {
  return useContext(AuthProviderContext);
}

export default function AuthProvider({ children }) {
  const token = localStorage.getItem("tarn-front-token");
  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
  };

  const [login, setLogin] = useState(initialState);
  const [isLoading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(LOGIN_API, login)
      .then((res) => {
        localStorage.setItem("tarn-front-token", res.data.token);
        setLoading(false);
        console.log(res);
        setUser(res.data.user);
        setAuth(true);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = {
    user,
    logout,
    handleLogin,
    isLoading,
    setLogin,
    login,
    isAuth,
  };
  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}
