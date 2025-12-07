import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const res = await axiosClient.get("/api/auth/me");
    setUser(res.data.user);
  };

  useEffect(() => {
    let active = true;

    const run = async () => {
      try {
        const res = await axiosClient.get("/api/auth/me");
        if (active) setUser(res.data.user);
      } finally {
        if (active) setLoading(false);
      }
    };

    run();

    return () => {
      active = false;
    };
  }, []);

  const logout = async () => {
    await axiosClient.post("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
