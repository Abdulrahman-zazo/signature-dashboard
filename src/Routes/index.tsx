import { createBrowserRouter, Navigate } from "react-router-dom";

import { ProtectedRoute } from "../components/ProtectedRoute";
import HomePage from "../Pages/Dashboard/Home";
import Dashboard from "../Pages/Dashboard";
import { LoginPage } from "../Pages/Auth/Login";
import { AuthRoute } from "../components/AuthRoute";
import ForgetPassword from "../Pages/Auth/Forget-Password";
import OrderPage from "../Pages/Dashboard/Orders";
import CountriesPage from "../Pages/Dashboard/Address/Countries/CountriesPage";
import CitiesPage from "../Pages/Dashboard/Address/Cities/CitiesPage";
import RegionsPage from "../Pages/Dashboard/Address/Regions/RegionsPage";
import ServicesPage from "../Pages/Dashboard/Services";
import SettingsPage from "../Pages/Dashboard/Settings";
import UsersPage from "../Pages/Dashboard/Users";
import ComplaintsPage from "../Pages/Dashboard/Complaints/ComplaintsPage";

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
          { path: "/countries", element: <CountriesPage /> },
          { path: "/cities", element: <CitiesPage /> },
          { path: "/cities", element: <CitiesPage /> },
          { path: "/regions", element: <RegionsPage /> },
          { path: "/services", element: <ServicesPage /> },
          { path: "/settings", element: <SettingsPage /> },
          { path: "/users", element: <UsersPage /> },
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
