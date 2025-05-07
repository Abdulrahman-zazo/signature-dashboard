import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/store";

export const AuthRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};
