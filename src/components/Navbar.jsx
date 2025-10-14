import React, { useState, useRef, useEffect } from "react";
import styles from "../stylesheet/Navbar.module.css";
import logoimage from "../assets/Group 235 (1).png";
import userimage from "../assets/userimage/userimag2.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Protect /courses route
  useEffect(() => {
    if (location.pathname === "/courses" && !isAuthenticated) {
      alert("Please login first to access courses.");
      navigate("/login");
    }
  }, [location, isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to home after logout
  };

  return (
    <nav className={`navbar-expand-lg ${styles.navbarParent}`}>
      <div className={`${styles.navbarParent} container-fluid`}>
        {/* Logo */}
        <Link to="/" className={`${styles.navbarBrand} ${styles.logo}`}>
          <img src={logoimage} alt="Not Found" width="70px" height="50px" />
        </Link>

        {/* Nav Links */}
        <div className={`${styles.navbarNav} collapse navbar-collapse`}>
          <ul className={`${styles.navbarNav}`}>
            <li className={`${styles.navItem}`}>
              <Link to="/" className={`${styles.navLink}`}>Home</Link>
            </li>

            <li className={`${styles.navItem}`}>
              <Link to="/courses" className={`${styles.navLink}`}>Courses</Link>
            </li>

            <li className={`${styles.navItem}`}>
              <Link to="/careers" className={`${styles.navLink}`}>Careers</Link>
            </li>

            <li className={`${styles.navItem}`}>
              <Link to="/blogs" className={`${styles.navLink}`}>Blog</Link>
            </li>

            <li className={`${styles.navItem}`}>
              <Link to="/aboutus" className={`${styles.navLink}`}>About Us</Link>
            </li>

            {/* Profile / Auth Buttons */}
            {isAuthenticated ? (
              <li className={`${styles.navItem} ${styles.profileDropdown}`} ref={dropdownRef}>
                <div
                  className={`${styles.profileHeader}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img src={userimage} alt="not found" className={styles.lianaProfileImage} />
                  <span className={`${styles.profileName}`}>
                    Welcome <br /> {user?.name || "User"}!
                  </span>
                  <RiArrowDropDownLine
                    size={26}
                    className={`${styles.dropdownIcon} ${dropdownOpen ? styles.rotate : ""}`}
                  />
                </div>

                {dropdownOpen && (
                  <ul className={styles.profileDropdownMenu}>
                    <li><Link to="/profile" className={styles.dropdownItem}>My Profile</Link></li>
                    <li><Link to="/settings" className={styles.dropdownItem}>Settings</Link></li>
                    <li><button onClick={handleLogout} className={`styles.dropdownItem btn btn-danger`}>Logout</button></li>
                  </ul>
                )}
              </li>
            ) : (
              <li className={styles.navItem}>
                <Link to="/login" className={styles.navLink}>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
