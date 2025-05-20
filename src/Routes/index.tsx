import { createBrowserRouter, Navigate } from "react-router-dom";

import { ProtectedRoute } from "../components/ProtectedRoute";
import HomePage from "../Pages/Dashboard/Home";
import Dashboard from "../Pages/Dashboard";
import { LoginPage } from "../Pages/Auth/Login";
import { AuthRoute } from "../components/AuthRoute";
import ForgetPassword from "../Pages/Auth/Forget-Password";
import OrderPage from "../Pages/Dashboard/Orders";

import ServicesPage from "../Pages/Dashboard/Services";
import SettingsPage from "../Pages/Dashboard/Settings";
import UsersPage from "../Pages/Dashboard/Users";
import ComplaintsPage from "../Pages/Dashboard/Complaints/ComplaintsPage";
import Address from "../Pages/Dashboard/Address/Address";
// import AdminPage from "../Pages/Dashboard/Admin";

export const router = createBrowserRouter([
  {
    element: <AuthRoute />,
    path: "/auth",
    children: [
      { index: true, path: "login", element: <LoginPage /> },
      { path: "forget-password", element: <ForgetPassword /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    path: "/",
    children: [
      {
        element: <Dashboard />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "/order", element: <OrderPage /> },
          { path: "/address", element: <Address /> },
          { path: "/services", element: <ServicesPage /> },
          { path: "/settings", element: <SettingsPage /> },
          { path: "/users", element: <UsersPage /> },
          // { path: "/admin", element: <AdminPage /> },
          { path: "/complaints", element: <ComplaintsPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
