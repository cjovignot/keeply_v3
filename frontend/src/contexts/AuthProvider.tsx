import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { AuthContext, type User } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const didFetchRef = useRef(false);

  // 🔹 Initialise Axios avec le token PWA s’il existe
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // 🔹 Récupère l'utilisateur connecté via cookie HTTP-only ou token PWA
  const fetchMe = async () => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;

    try {
      let res;
      const pwaToken = localStorage.getItem("token");
      if (pwaToken) {
        res = await axiosClient.get("/auth/me", {
          headers: { Authorization: `Bearer ${pwaToken}` },
        });
      } else {
        res = await axiosClient.get("/auth/me");
      }
      setUser(res.data.user ?? res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  // LOGIN classique
  const login = async (email: string, password: string) => {
    const res = await axiosClient.post("/auth/login", { email, password });
    setUser(res.data.user ?? res.data);
    navigate("/profile", { replace: true });
    return res.data.user ?? res.data;
  };

  // SIGNUP
  const signup = async (name: string, email: string, password: string) => {
    const res = await axiosClient.post("/auth/signup", {
      name,
      email,
      password,
    });
    setUser(res.data.user ?? res.data);
    navigate("/profile", { replace: true });
    return res.data.user ?? res.data;
  };

  // GOOGLE LOGIN (PWA ou navigateur classique)
  const loginWithGoogle = async (credential: string, isPWA = false) => {
    const res = await axiosClient.post("/auth/google-login", {
      token: credential,
      isPWA,
    });

    const userData = res.data.user ?? res.data;

    if (isPWA && res.data.token) {
      localStorage.setItem("token", res.data.token);
      axiosClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
    }

    setUser(userData);
    navigate("/profile", { replace: true });
    return userData;
  };

  // LOGOUT
  const logout = async () => {
    try {
      await axiosClient.post("/auth/logout");
    } catch {}
    setUser(null);
    localStorage.removeItem("token");
    delete axiosClient.defaults.headers.common["Authorization"];
    navigate("/login", { replace: true });
  };

  // Intercepteur : logout auto sauf pour /me
  useEffect(() => {
    const interceptor = axiosClient.interceptors.response.use(
      (res) => res,
      (err) => {
        const url = err.config?.url;
        if (err.response?.status === 401 && url !== "/auth/me") {
          logout();
        }
        return Promise.reject(err);
      }
    );
    return () => axiosClient.interceptors.response.eject(interceptor);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, setUser, login, signup, loginWithGoogle, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
