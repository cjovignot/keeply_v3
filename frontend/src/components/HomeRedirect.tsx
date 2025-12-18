import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import Home from "../pages/Home";

const HomeRedirect = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  // Vérifie si la navigation est "initiale" sur "/"
  // location.key est "default" lors du premier chargement
  const isInitialLoad = location.key === "default" && location.pathname === "/";

  if (user && isInitialLoad) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Home />;
};

export default HomeRedirect;
