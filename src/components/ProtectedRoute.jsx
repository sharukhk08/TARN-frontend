import { Navigate } from "react-router-dom";
import { useAuthProvider } from "../contexts/AuthProvider";

export const ProtectedRoute = ({ children }) => {
  const { isAuth } = useAuthProvider();
  console.log(isAuth, "isAuth in protect route");
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
};
