import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axiosInstance";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const isAuthenticated = !!token;

  // Persist token
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token]);

  // =========================
  // LOGIN
  // =========================
  const login = async (payload) => {
    try {
      const res = await axios.post("/auth/login", {
        usernameOrEmail: payload.usernameOrEmail,
        password: payload.password,
      });

      const { token: jwt, user: loggedInUser } = res.data;

      setToken(jwt);
      setUser(loggedInUser);

      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      return { success: true, user: loggedInUser };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // =========================
  // REGISTER
  // =========================
  const register = async (payload) => {
    try {
      const res = await axios.post("/auth/register", payload);
      const { token: jwt, user: newUser } = res.data;

      setToken(jwt);
      setUser(newUser);

      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(newUser));

      return { success: true, user: newUser };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
