import React, { useState } from "react";
import loginimage from "./../assets/signup/signup.png";
import styles from "./../stylesheet/signup.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate import kiya gaya

const Signup = () => {
  const navigate = useNavigate(); // 🌟 Hook initialize
  const [formData, setFormData] = useState({
    email: "",
    name: "",
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
    if (!formData.name) {
      newErrors.name = "Username is required.";
    } else if (formData.name.length < 3) {
      newErrors.name = "Username must be at least 3 characters.";
    }
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
    setErrors({}); // Clear previous errors
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      
      // Success: User create ho gaya
      alert('Registration Successful! Redirecting to Login.');
      // 🌟 FIX: Redirection logic
      navigate('/login'); 
      
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed. Please check if email is already in use.';
      setErrors({ general: msg });
      console.error('Signup Error:', error);

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
            alt="Sign up illustration"
            className={`${styles.loginsideImage} img-fluid`}
          />
        </div>

        <div className="col-md-6">
          <div className={styles.loginContent}>
            <h2 className="mt-5">Welcome to LearnHub!</h2>
            <form
              method="POST"
              onSubmit={handleSubmit}
              className={styles.loginFormParent}
            >
              {errors.general && <p className={`${styles.errorText} text-center`}>{errors.general}</p>}

              {/* Username Input */}
              <label htmlFor="name" className={styles.formLabel}>
                User Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`${styles.animatedInput}`}
                required
                placeholder="Enter your name"
                disabled={loading}
              />
              {errors.name && <p className={styles.errorText}>{errors.name}</p>}

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
                className={`${styles.animatedInput}`}
                required
                placeholder="Enter your email"
                disabled={loading}
              />
              {errors.email && <p className={styles.errorText}>{errors.email}</p>}

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
              {errors.password && <p className={styles.errorText}>{errors.password}</p>}

              <button type="submit" className={styles.loginSubmitBtn} disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
