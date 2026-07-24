import { createBrowserRouter } from "react-router-dom";
import SplashScreen from "../pages/SplashScreen";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
