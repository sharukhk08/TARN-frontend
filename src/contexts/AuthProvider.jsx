import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN_API, CHECK_AUTH_API } from "../ApiServices";

const AuthProviderContext = createContext();

export function useAuthProvider() {
  return useContext(AuthProviderContext);
}

export default function AuthProvider({ children }) {
  const initialState = {
    email: "",
    password: "",
  };
  const token = localStorage.getItem("tarn-front-token");
  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [login, setLogin] = useState(initialState);
  const [isLoading, setLoading] = useState(false);
  const [isPrivateLoading, setPrivateLoading] = useState(true);

  useEffect(() => {
    setPrivateLoading(true);
    const headers = {
      token: `${localStorage.getItem("tarn-front-token")}`,
    };
    console.log(headers);
    if (headers.token) {
      axios
        .post(CHECK_AUTH_API, headers)
        .then((res) => {
          setUser(res.data.user);
          setAuth(true);
          setPrivateLoading(false);
          navigate("/");
        })
        .catch((err) => {
          setPrivateLoading(false);
          console.log(err);
        });
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(LOGIN_API, login)
      .then((res) => {
        localStorage.setItem("tarn-front-token", res.data.accessToken);
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
  function logout() {
    setUser({});
    setAuth(false);
    localStorage.removeItem("tarn-front-token");
    navigate("/login");
  }

  const value = {
    user,
    logout,
    handleLogin,
    isLoading,
    setLogin,
    login,
    isAuth,
    isPrivateLoading,
  };
  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}
