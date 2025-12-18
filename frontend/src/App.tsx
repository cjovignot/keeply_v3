import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useAuth } from "./contexts/useAuth";

import FloatingPrintButton from "./components/FloatingPrintButton";
import MobileLayout from "./layouts/MobileLayout";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import UserAccount from "./pages/UserAccount";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminUsers from "./pages/Admin/Users";
import Settings from "./pages/Settings";
import Storages from "./pages/Storages";
import Boxes from "./pages/Boxes";
import BoxDetails from "./pages/Box/BoxDetails";
import BoxEdit from "./pages/Box/BoxEdit";
import PrintGroup from "./pages/PrintGroup";
import ScanPage from "./pages/ScanPage";
import BoxCreate from "./pages/BoxCreate";
import StorageCreate from "./pages/StorageCreate";
import AuthSuccess from "./pages/AuthSuccess";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import LegalMentions from "./pages/LegalMentions";
import About from "./pages/About";
import Home from "./pages/Home";
import { InstallBanner } from "./components/UI/InstallBanner";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/" replace />;

  return children;
};

function App() {
  const location = useLocation();

  // 🔧 Service Worker
  useEffect(() => {
    if ("serviceWorker" in navigator && import.meta.env.PROD) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .catch((err) => console.error("🔴 Erreur Service Worker :", err));
      });
    }
  }, []);

  // 📱 Mode PWA
  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone;
    if (isStandalone) console.log("📱 PWA standalone");
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <InstallBanner />

        <Routes location={location}>
          <Route element={<MobileLayout />}>
            {/* Routes publiques */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/success" element={<AuthSuccess />} />
            <Route path="/conditions_d_utilisation" element={<Terms />} />
            <Route path="/regles_de_confidentialite" element={<Privacy />} />
            <Route path="/mentions_legales" element={<LegalMentions />} />
            <Route path="/a_propos" element={<About />} />

            {/* Routes protégées */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/useraccount"
              element={
                <ProtectedRoute>
                  <UserAccount />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />

            <Route path="/storages" element={<Storages />} />
            <Route path="/boxes" element={<Boxes />} />

            <Route
              path="/box/boxdetails/:id"
              element={
                <ProtectedRoute>
                  <BoxDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/box/boxEdit/:id"
              element={
                <ProtectedRoute>
                  <BoxEdit />
                </ProtectedRoute>
              }
            />

            <Route
              path="/printgroup"
              element={
                <ProtectedRoute>
                  <PrintGroup />
                </ProtectedRoute>
              }
            />

            <Route
              path="/boxes/new"
              element={
                <ProtectedRoute>
                  <BoxCreate />
                </ProtectedRoute>
              }
            />

            <Route
              path="/storages/new"
              element={
                <ProtectedRoute>
                  <StorageCreate />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route path="/scan" element={<ScanPage />} />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>

        <FloatingPrintButton />
      </AnimatePresence>
    </>
  );
}

export default App;
