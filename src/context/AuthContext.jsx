import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../config"; // 👈 import config file

const API_URL = `${config.API_BASE_URL}/auth`; // ✅ auto works for dev + production
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    if (token) {
      try {
        const res = await axios.get(`${API_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsAuthenticated(true);
      } catch (err) {
        console.error("⚠️ Token invalid or expired. Logging out.");
        logout();
      }
    }
    setLoading(false);
  };

  const login = (userData) => {
    localStorage.setItem("authToken", userData.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: userData._id,
        name: userData.name,
        email: userData.email,
      })
    );

    setToken(userData.token);
    setUser({
      _id: userData._id,
      name: userData.name,
      email: userData.email,
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    loadUser();
  }, [token]);

  const value = { user, isAuthenticated, loading, login, logout };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Checking user session...
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
