// File: src/main.jsx

import React from 'react'; // 🌟 FIX: React object ko import kiya gaya
import { StrictMode } from 'react'; // Ab yeh optional ho jata hai agar upar React import hai
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; 
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  // Ab 'React.StrictMode' theek se pehchana jayega
  <React.StrictMode> 
    <BrowserRouter>
      <AuthProvider> 
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);