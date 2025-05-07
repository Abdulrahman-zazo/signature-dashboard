import { createBrowserRouter, Navigate } from "react-router-dom";

import { ProtectedRoute } from "../components/ProtectedRoute";
import HomePage from "../Pages/Dashboard/Home";
import Dashboard from "../Pages/Dashboard";
import { LoginPage } from "../Pages/Auth/Login";
import { AuthRoute } from "../components/AuthRoute";
import ForgetPassword from "../Pages/Auth/Forget-Password";

export const router = createBrowserRouter([
  {
    element: <AuthRoute />,
    path: "/auth",
    children: [
      { index: true, path: "login", element: <LoginPage /> },
      { index: true, path: "forget-password", element: <ForgetPassword /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Dashboard />,
        children: [{ index: true, path: "/", element: <HomePage /> }],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
