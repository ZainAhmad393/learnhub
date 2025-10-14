 import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // ... baqi states
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [loading, setLoading] = useState(true);
    
    const loadUser = async () => {
        if (token) {
            try {
                const res = await axios.get(`${API_URL}/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
                setIsAuthenticated(true);
            } catch (err) {
                console.error('Token is invalid or expired. Logging out.');
                logout();
            }
        }
        setLoading(false);
    };

    const login = (userData) => {
        localStorage.setItem('authToken', userData.token);
        setToken(userData.token);
        // Ab hum user ka pura data (name, email) context mein save karenge
        setUser({ name: userData.name, email: userData.email, _id: userData._id }); 
        setIsAuthenticated(true);
        // We will now handle navigation in the component (Login.jsx)
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };
    
    useEffect(() => {
        loadUser();
    }, [token]);

    const value = {
        user, // Ab ismein user ka name hoga
        isAuthenticated,
        loading,
        login,
        logout,
        // ... authAxios
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Checking user session...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
