import { Navigate } from "react-router-dom";
import { useAuthProvider } from "../contexts/AuthProvider";
import PreLoader from "./common/PreLoader";

export const ProtectedRoute = ({ children }) => {
  const { isAuth, isPrivateLoading } = useAuthProvider();

  if (isPrivateLoading) {
    return <PreLoader />;
  }
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
};
