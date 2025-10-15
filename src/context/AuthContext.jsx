import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";
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

  // ✅ Load user details if token exists
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

  // ✅ Login & save everything locally
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

  // ✅ Logout & clear localStorage
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // 🔁 Check token on app load or when token changes
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
