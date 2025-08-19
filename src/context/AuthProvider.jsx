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


  const login = async (userData) => {
    setUser(userData);
  };

   const logout = async () => {
    await axiosClient.post("/api/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

