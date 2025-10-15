import React, { useState, useEffect } from "react";
import config from "../config";
import styles from "../stylesheet/CoursesPage.module.css";
import {
  FaLaptopCode,
  FaChartLine,
  FaPaintBrush,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MyLearningPath from "./MyactiveLearningpath";
import axios from "axios";

const INITIAL_DISPLAY_COUNT = 3;

const extractPlaylistId = (urlOrId) => {
  if (!urlOrId) return "";
  try {
    const params = new URLSearchParams(new URL(urlOrId).search);
    return params.get("list") || urlOrId.trim();
  } catch {
    return urlOrId.trim();
  }
};

const categories = [
  { name: "Development", icon: FaLaptopCode, filter: "Web Dev" },
  { name: "Data Science", icon: FaChartLine, filter: "Data Science" },
  { name: "Design", icon: FaPaintBrush, filter: "Design" },
  { name: "Marketing", icon: FaPaintBrush, filter: "Marketing" },
];

const CoursesPage = () => {
  const [activeFilter, setActiveFilter] = useState("All Categories");
  const [featuredCoursesData, setFeaturedCoursesData] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAllActive, setShowAllActive] = useState(false);
  const [showAllFeatured, setShowAllFeatured] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const API_BASE_URL = config.API_BASE_URL;
  // ✅ DEBUGGING: Fetch courses from backend
  const fetchCourses = async (filter) => {
    setIsLoading(true);
    try {
      console.log("🔄 Fetching courses from backend...");
      const res = await axios.get(`${API_BASE_URL}/courses`);
      console.log("📦 Backend courses response:", res.data);

      let courses = Array.isArray(res.data) ? res.data : [];
      console.log(`📚 Total courses received: ${courses.length}`);

      if (filter !== "All Categories") {
        courses = courses.filter((course) => course.category === filter);
        console.log(`🎯 Filtered courses for ${filter}: ${courses.length}`);
      }

      setFeaturedCoursesData(courses);
    } catch (error) {
      console.error("❌ Failed to fetch courses:", error);
      console.error("Error details:", error.response?.data);
      setFeaturedCoursesData([]);
    }
    setIsLoading(false);
  };

  // ✅ DEBUGGING: Fetch enrolled courses
  const fetchEnrolledCourses = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        console.log("👤 No user logged in");
        setEnrolledCourses([]);
        return;
      }

      console.log("🔄 Fetching enrollments for user:", user._id);
      // ✅ CORRECT URL: /api/enrollments/user/userId
      const res = await axios.get(
        `${API_BASE_URL}/enrollments/user/${user._id}`
      );
      console.log("📦 Enrollments response:", res.data);

      setEnrolledCourses(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("❌ Failed to fetch enrolled courses:", error);
      console.error("Error details:", error.response?.data);
      setEnrolledCourses([]);
    }
  };

  // ✅ Enroll function
  const handleEnroll = async (course) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Please login to enroll in courses");
        return;
      }

      console.log("🎯 Enrolling in course:", course.title);
      const res = await axios.post(`${API_BASE_URL}/enrollments/enroll`, {
        userId: user._id,
        courseId: course._id,
      });

      console.log("✅ Enrollment successful:", res.data);
      fetchEnrolledCourses(); // Refresh enrolled courses
      alert(`You have successfully enrolled in ${course.title}!`);
    } catch (error) {
      console.error("❌ Enroll failed:", error);
      alert(error.response?.data?.message || "Failed to enroll. Try again.");
    }
  };

  const handleStartLearning = (course) => {
    const courseWithPlaylist = {
      ...course,
      playlistId: extractPlaylistId(course.playlistUrl),
    };
    setSelectedCourse(courseWithPlaylist);
  };

  useEffect(() => {
    console.log("🚀 CoursesPage mounted");
    fetchCourses(activeFilter);
    fetchEnrolledCourses();
  }, [activeFilter]);

  // Display logic
  const featuredCoursesToDisplay = showAllFeatured
    ? featuredCoursesData
    : featuredCoursesData.slice(0, INITIAL_DISPLAY_COUNT);

  const activeCoursesToDisplay = showAllActive
    ? enrolledCourses
    : enrolledCourses.slice(0, INITIAL_DISPLAY_COUNT);

  const categoriesToDisplay = showAllCategories
    ? categories
    : categories.slice(0, INITIAL_DISPLAY_COUNT);

  const isFeaturedSectionExpandable =
    featuredCoursesData.length > INITIAL_DISPLAY_COUNT;
  const isCategorySectionExpandable = categories.length > INITIAL_DISPLAY_COUNT;
  const isActiveSectionExpandable =
    enrolledCourses.length > INITIAL_DISPLAY_COUNT;

  // ✅ Helper to get course display data
  const getCourseDisplayData = (course) => {
    return {
      id: course._id || course.id,
      title: course.title,
      image: course.image,
      progress: course.progress || 0,
      instructor: course.instructor,
      duration: course.duration,
      playlistUrl: course.playlistUrl,
      rating: course.rating,
    };
  };

  // ✅ Helper to get enrollment display data
  const getEnrollmentDisplayData = (enrollment) => {
    const course = enrollment.courseId || enrollment;
    return {
      id: enrollment._id || course._id,
      title: course.title,
      image: course.image,
      progress: enrollment.progress || 0,
      instructor: course.instructor,
      duration: course.duration,
      playlistUrl: course.playlistUrl,
      rating: course.rating,
      _id: course._id,
    };
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      {selectedCourse && (
        <div className={styles.learningPathOverlay}>
          <button
            className={styles.closePathBtn}
            onClick={() => setSelectedCourse(null)}
          >
            Close X
          </button>
          <MyLearningPath
            playlistId={selectedCourse.playlistId}
            course={selectedCourse}
            onProgressUpdate={fetchEnrolledCourses}
          />
        </div>
      )}

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.mainHeading}>Find Your Next Skill Upgrade</h1>
        <div className={styles.filterBar}>
          {[
            "All Categories",
            "Web Dev",
            "Data Science",
            "Design",
            "Marketing",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`${styles.categoryButton} ${
                activeFilter === cat ? styles.active : ""
              }`}
              disabled={isLoading}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Courses Section */}
      <section className={styles.progressSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Courses in {activeFilter}</h2>
          {isFeaturedSectionExpandable && (
            <button
              className={styles.toggleButton}
              onClick={() => setShowAllFeatured(!showAllFeatured)}
            >
              {showAllFeatured ? (
                <>
                  <FaChevronUp size={16} /> Show Less
                </>
              ) : (
                <>
                  <FaChevronDown size={16} /> Show All (
                  {featuredCoursesData.length})
                </>
              )}
            </button>
          )}
        </div>

        {isLoading ? (
          <p className={styles.loadingMessage}>
            Loading courses... Please wait.
          </p>
        ) : (
          <div className={styles.courseGrid}>
            {featuredCoursesToDisplay.map((course) => {
              const courseData = getCourseDisplayData(course);
              return (
                <div key={courseData.id} className={styles.courseCard}>
                  <img
                    src={courseData.image}
                    alt={courseData.title}
                    className={styles.courseImage}
                    onError={(e) =>
                      (e.target.src =
                        "https://placehold.co/300x160/cccccc/000000?text=Course+Image")
                    }
                  />
                  <div className={styles.cardContent}>
                    <h3 className={styles.courseTitle}>{courseData.title}</h3>
                    <p className={styles.courseDescription}>
                      Taught by {courseData.instructor} | {courseData.duration}
                    </p>
                    <div className={styles.courseMeta}>
                      <span>⭐ {courseData.rating} Rating</span>
                      <span>{courseData.duration}</span>
                    </div>
                    <button
                      className={styles.enrollButton}
                      onClick={() => handleEnroll(course)}
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              );
            })}
            {featuredCoursesToDisplay.length === 0 && !isLoading && (
              <p className={styles.noResults}>
                No courses found in this category.
              </p>
            )}
          </div>
        )}
      </section>

      {/* My Enrolled Courses */}
      <section className={styles.progressSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>My Enrolled Courses</h2>
          {isActiveSectionExpandable && (
            <button
              className={styles.toggleButton}
              onClick={() => setShowAllActive(!showAllActive)}
            >
              {showAllActive ? (
                <>
                  <FaChevronUp size={16} /> Show Less
                </>
              ) : (
                <>
                  <FaChevronDown size={16} /> Show All ({enrolledCourses.length}
                  )
                </>
              )}
            </button>
          )}
        </div>

        <div className={styles.courseGrid}>
          {activeCoursesToDisplay.map((enrollment) => {
            const courseData = getEnrollmentDisplayData(enrollment);
            return (
              <div key={courseData.id} className={styles.courseCard}>
                <img
                  src={courseData.image}
                  alt={courseData.title}
                  className={styles.courseImage}
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/300x160/cccccc/000000?text=Course+Image")
                  }
                />
                <div className={styles.cardContent}>
                  <h3 className={courseData.title}>{courseData.title}</h3>
                  <p className={styles.courseDescription}>
                    Progress: {courseData.progress}%
                  </p>
                  <div className={styles.progressBarContainer}>
                    <div
                      className={styles.progressBar}
                      style={{ width: `${courseData.progress}%` }}
                    ></div>
                  </div>
                  <button
                    className={styles.enrollButton}
                    onClick={() => handleStartLearning(courseData)}
                  >
                    {courseData.progress === 100
                      ? "Completed! Review"
                      : "Resume Learning"}
                  </button>
                  {courseData.progress === 100 && (
                    <p className={styles.completionBadge}>🎉 COURSE COMPLETE</p>
                  )}
                </div>
              </div>
            );
          })}
          {activeCoursesToDisplay.length === 0 && (
            <p className={styles.noResults}>
              You are not enrolled in any courses. Enroll above to start!
            </p>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Browse Top Categories</h2>
          {isCategorySectionExpandable && (
            <button
              className={styles.toggleButton}
              onClick={() => setShowAllCategories(!showAllCategories)}
            >
              {showAllCategories ? (
                <>
                  <FaChevronUp size={16} /> Show Less
                </>
              ) : (
                <>
                  <FaChevronDown size={16} /> Show All ({categories.length})
                </>
              )}
            </button>
          )}
        </div>

        <div className={styles.categoryGrid}>
          {categoriesToDisplay.map((category) => (
            <div
              key={category.name}
              className={styles.categoryTile}
              onClick={() => setActiveFilter(category.filter)}
            >
              <category.icon size={30} />
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CoursesPage;
