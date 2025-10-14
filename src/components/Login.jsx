// Login component
import React, { useState } from "react";
import loginimage from "./../assets/login/login.png";
import styles from "./../stylesheet/login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { useAuth } from './../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate import karna hai
import { Link } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate(); // 🌟 Hook initialize
  const { login } = useAuth(); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', formData);
        
        // Backend successful, token receive hua, login context update karen
        login(res.data); 
        
        // 🌟 FIX: Redirection to Home Page
        navigate('/'); 

    } catch (error) {
        const msg = error.response?.data?.message || 'Login failed. Check credentials.';
        setErrors({ general: msg });
        console.error('Login Error:', error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className={`container ${styles.loginContainer}`}>
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src={loginimage}
            alt="Login illustration"
            className={`${styles.loginsideImage} img-fluid`}
          />
        </div>

        <div className="col-md-6">
          <div className={styles.loginContent}>
            <h2 className={`mt-5 ${styles.welcomeHeading}`}>
              Welcome to LearnHub!
            </h2>
            <form
              method="POST"
              onSubmit={handleSubmit}
              className={styles.loginFormParent}
            >
              {errors.general && <p className={`${styles.errorText} text-center`}>{errors.general}</p>}

              {/* Email Input */}
              <label htmlFor="email" className={styles.formLabel}>
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.emailInputLogin} ${styles.animatedInput}`}
                required
                placeholder="Enter your email"
                disabled={loading}
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email}</p>
              )}

              {/* Password Input with Icon */}
              <label htmlFor="password" className={styles.formLabel}>
                Password
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${styles.passwordInputLogin} ${styles.animatedInput}`}
                  required
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <span
                  className={styles.toggleIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className={styles.errorText}>{errors.password}</p>
              )}

              {/* Remember Me + Forgot Password */}
              <div className={styles.forgotAndRememberMe}>
                <div className={styles.customCheckbox}>
                  <input type="checkbox" id="rememberMe" disabled={loading} />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <div className={styles.forgot}>
                <Link to="/forgotpassword">Forgot Password?</Link>
                </div>
              </div>

              <button type="submit" className={styles.loginSubmitBtn} disabled={loading}>
                {loading ? 'Logging In...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
