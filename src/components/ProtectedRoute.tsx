import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/store";

export const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};
