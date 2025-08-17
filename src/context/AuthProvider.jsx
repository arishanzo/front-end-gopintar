// src/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axiosClient from "../lib/axios";

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user saat pertama kali aplikasi dibuka
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axiosClient.get("/sanctum/csrf-cookie"); // CSRF token
        const res = await axiosClient.get("/api/user"); // Ambil user login
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

