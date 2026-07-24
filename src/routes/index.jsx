import { createBrowserRouter, Navigate } from "react-router-dom";
import SplashScreen from "../pages/SplashScreen";
import Login from "../pages/Login";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardPage from "../pages/Dashboard";
import PenimbanganPage from "../pages/Penimbangan";
import KalibrasiPage from "../pages/Kalibrasi";
import useAuth from "../hooks/useAuth";

// Wrapper for Routes that require authentication
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div className="splash-loader"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Wrapper for routes that should only be accessed when NOT logged in (e.g. login)
function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div className="splash-loader"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "penimbangan",
        element: <PenimbanganPage />,
      },
      {
        path: "kalibrasi",
        element: <KalibrasiPage />,
      },
    ],
  },
  // Fallback redirect
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
