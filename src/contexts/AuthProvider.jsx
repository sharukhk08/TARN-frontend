import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN_API, CHECK_AUTH_API, SIGNUP_API } from "../ApiServices";

const AuthProviderContext = createContext();

export function useAuthProvider() {
  return useContext(AuthProviderContext);
}

export default function AuthProvider({ children }) {
  const initialState = {
    email: "",
    password: "",
  };
  const signupinitialState = {
    name: "",
    email: "",
    password: "",
  };
  const [isAuth, setAuth] = useState(false);
  const [Error, setError] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [login, setLogin] = useState(initialState);
  const [isLoading, setLoading] = useState(false);
  const [isPrivateLoading, setPrivateLoading] = useState(true);

  const [signup, setSignup] = useState(signupinitialState);
  const [isSignUpLoading, setSignUpLoading] = useState(false);

  useEffect(() => {
    const headers = {
      token: `${localStorage.getItem("tarn-front-token")}`,
    };
    console.log(headers);
    if (headers.token !== "null") {
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
    } else {
      setPrivateLoading(false);
    }
  }, []);

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
        setLogin(initialState);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setError(err.response.data.message);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setSignUpLoading(true);
    axios
      .post(SIGNUP_API, signup)
      .then((res) => {
        console.log(res);
        localStorage.setItem("tarn-front-token", res.data.token);
        setUser(res.data.user);
        setSignUpLoading(false);
        setAuth(true);
        setPrivateLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setSignUpLoading(false);
        console.log(err);
        setError(err.response.data.message);
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
    handleSignup,
    isSignUpLoading,
    signup,
    setSignup,
    Error,
  };
  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}
