import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../stylesheet/ProfilePage.module.css';
import defaultImages from '../assets/courses/code.jpg'
import { Link } from 'react-router-dom';
import { 
  FaEnvelope, FaUserEdit, FaSignOutAlt, 
  FaTrophy, FaChartLine, FaClock, FaPlay 
} from "react-icons/fa";
import Navbar from './Navbar';
import Footer from './Footer';

const DEFAULT_AVATAR_MALE = 'https://placehold.co/150x150/4db6ac/ffffff?text=M+User';

const ProfilePage = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // ✅ Fetch enrolled courses from localStorage
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    setEnrolledCourses(storedCourses);
  }, []);

  // Redirect if user not logged in
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading || !isAuthenticated) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading profile...</div>;
  }

  // Dummy stats (optional — you can calculate dynamically)
  const userStats = {
    totalCourses: enrolledCourses.length,
    completedCourses: enrolledCourses.filter(c => c.progress >= 100).length,
    totalTime: '45 hrs',
    currentProgress: enrolledCourses.length > 0 
      ? Math.round(enrolledCourses.reduce((sum, c) => sum + (c.progress || 0), 0) / enrolledCourses.length)
      : 0,
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <div className={styles.container}>
        {/* Profile Info */}
        <div className={styles.profileCard}>
          <div className={styles.header}>
            <img 
              src={user.avatar || DEFAULT_AVATAR_MALE} 
              alt={user.name} 
              className={styles.avatar} 
              onError={(e) => e.target.src = DEFAULT_AVATAR_MALE}
            />
            <h1 className={styles.userName}>{user.name}</h1>
            <p className={`${styles.userRole} text-align-center w-100 mt-3 `}>Registered Learner</p>
          </div>

          <div className={styles.detailsSection}>
            <div className={styles.detailItem}>
              <FaEnvelope className={styles.detailIcon} />
              <span>{user.email}</span>
            </div>
            <button className={styles.actionButton}>
              <FaUserEdit /> Edit Profile
            </button>
          </div>
        </div>

        {/* 📊 Stats Section */}
        <div className={styles.statsGrid}>
          <div className={styles.statsCard}>
            <FaTrophy size={30} className={styles.statsIcon} style={{ color: '#f48c06' }} />
            <h4>Courses Completed</h4>
            <p className={styles.statsValue}>
              {userStats.completedCourses} / {userStats.totalCourses}
            </p>
          </div>

          <div className={styles.statsCard}>
            <FaChartLine size={30} className={styles.statsIcon} style={{ color: '#49bbbd' }} />
            <h4>Overall Progress</h4>
            <div className={styles.progressBarContainer}>
              <div
                className={styles.progressBar}
                style={{ width: `${userStats.currentProgress}%` }}
              ></div>
            </div>
            <p className={styles.statsText}>{userStats.currentProgress}% Average</p>
          </div>

          <div className={styles.statsCard}>
            <FaClock size={30} className={styles.statsIcon} style={{ color: '#2F327D' }} />
            <h4>Learning Hours</h4>
            <p className={styles.statsValue}>{userStats.totalTime}</p>
          </div>
        </div>

        {/* 🧠 Enrolled Courses Section */}
        <div className={styles.enrolledCourses}>
          <h2>Your Enrolled Courses</h2>
          {enrolledCourses.length === 0 ? (
            <p>You haven’t enrolled in any course yet.</p>
          ) : (
            <div className={styles.courseList}>
              {enrolledCourses.map((course, index) => (
                <div key={index} className={styles.courseCard}>
                  <img src={defaultImages} alt={course.title} className={styles.courseImage} />
                  <div className={styles.courseInfo}>
                    <h3>{course.title}</h3>
                    <p>{course.desc}</p>
                    <div className={styles.progressWrapper}>
                      <div className={styles.progressBarContainer}>
                        <div
                          className={styles.progressBar}
                          style={{ width: `${course.progress || 0}%` }}
                        ></div>
                      </div>
                      <p>{course.progress || 0}% completed</p>
                    </div>
                    <Link
                      className={styles.startBtn}
                      to="/courses"
                    >
                      <FaPlay /> Continue Learning
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logout */}
        <div className={styles.logoutWrapper}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
