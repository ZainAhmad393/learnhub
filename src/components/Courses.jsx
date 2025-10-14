import React, { useState, useEffect } from "react";
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

// Helper to extract Playlist ID
const extractPlaylistId = (urlOrId) => {
  if (!urlOrId) return "";
  try {
    const params = new URLSearchParams(new URL(urlOrId).search);
    return params.get("list") || urlOrId.trim();
  } catch {
    return urlOrId.trim();
  }
};

// Dummy data
const ALL_COURSES_DATA = [
  {
    id: 1,
    category: "Web Dev",
    title: "Modern React & Redux",
    instructor: "Anil Sidhu",
    duration: "4 hrs",
    rating: 4.7,
    image: "https://placehold.co/300x160/38a8a4/ffffff?text=React+UI",
    playlistUrl: "PL8p2I9GklV47BCAjiCtuV_liN9IwAl8pM",
  },
  {
    id: 2,
    category: "Data Science",
    title: "Mastering Python for Data Science",
    instructor: "Apna College",
    duration: "20 hrs",
    rating: 4.9,
    image: "https://placehold.co/300x160/546e7a/ffffff?text=Python+Data",
    playlistUrl: "PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0",
  },
  {
    id: 3,
    category: "Web Dev",
    title: "Full Stack Node.js & Express",
    instructor: "Apna College",
    duration: "18 hrs",
    rating: 4.6,
    image: "https://placehold.co/300x160/e0f7fa/000000?text=Node.js+Backend",
    playlistUrl: "PL8p2I9GklV456iofeMKReMTvWLr7Ki9At",
  },
  {
    id: 4,
    category: "Web Dev",
    title: "Advanced JavaScript",
    instructor: "Apna College",
    duration: "3 hrs",
    rating: 4.8,
    image: "https://placehold.co/300x160/546E7A/ffffff?text=JavaScript",
    playlistUrl: "PLGjplNEQ1it_oTvuLRNqXfz_v_0pq6unW",
  },
  {
    id: 5,
    category: "Design",
    title: "Advanced CSS & Tailwind",
    instructor: "Yahu Baba",
    duration: "2 hrs",
    rating: 4.8,
    image: "https://placehold.co/300x160/4db6ac/ffffff?text=CSS+Design",
    playlistUrl: "PL0b6OzIxLPbzDsI5YXUa01QzxOWyqmrWw",
  },
  {
    id: 6,
    category: "Marketing",
    title: " Mastering Digital Marketing",
    instructor: "Free Learnig Point",
    duration: "2 .5hrs",
    rating: 4.5,
    image: "https://placehold.co/300x160/00796B/ffffff?text=Digital%20Marketing",
    playlistUrl: "PL9ERAJ-z6sHX21rKpdC48RHm1U2ZOZ2tb",
  },
];

const categories = [
  { name: "Development", icon: FaLaptopCode, filter: "Web Dev" },
  { name: "Data Science", icon: FaChartLine, filter: "Data Science" },
  { name: "Design", icon: FaPaintBrush, filter: "Design" },
  { name: "Marketing", icon: FaPaintBrush, filter: "Marketing" },

];

const CoursesPage = () => {
  const [activeFilter, setActiveFilter] = useState("All Categories");
  const [featuredCoursesData, setFeaturedCoursesData] =
    useState(ALL_COURSES_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAllActive, setShowAllActive] = useState(false);
  const [showAllFeatured, setShowAllFeatured] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const handleProgressUpdate = (updatedCourse) => {
    const updatedList = enrolledCourses.map((c) =>
      c.id === updatedCourse.id ? updatedCourse : c
    );
    setEnrolledCourses(updatedList);
    localStorage.setItem("enrolledCourses", JSON.stringify(updatedList));
  };

  const handleEnroll = (course) => {
    const existingCourseIndex = enrolledCourses.findIndex(
      (c) => c.id === course.id
    );

    if (existingCourseIndex !== -1) {
      // ✅ Agar already enrolled hai, to update karo instead of skipping
      const updatedCourses = [...enrolledCourses];
      updatedCourses[existingCourseIndex] = {
        ...updatedCourses[existingCourseIndex],
        ...course,
        playlistId: extractPlaylistId(course.playlistUrl), // updated playlist
      };
      setEnrolledCourses(updatedCourses);
      localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses));

      alert(`Updated ${course.title} with latest playlist!`);
      setSelectedCourse(updatedCourses[existingCourseIndex]);
      return;
    }

    // ✅ Else, new enrollment
    const newEnrollment = {
      ...course,
      progress: 0,
      playlistId: extractPlaylistId(course.playlistUrl),
    };

    const updatedCourses = [...enrolledCourses, newEnrollment];
    setEnrolledCourses(updatedCourses);
    localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses));

    alert(`You have successfully enrolled in ${course.title}!`);
    setSelectedCourse(newEnrollment);
  };

  const handleStartLearning = (course) => {
    setSelectedCourse(course);
  };

  const fetchCourses = async (filter) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const filteredData =
      filter === "All Categories"
        ? ALL_COURSES_DATA
        : ALL_COURSES_DATA.filter((course) => course.category === filter);

    setFeaturedCoursesData(filteredData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCourses(activeFilter);
    const savedCourses = JSON.parse(localStorage.getItem("enrolledCourses"));
    if (savedCourses) {
      setEnrolledCourses(savedCourses);
    }
  }, [activeFilter]);

  const activeCoursesToDisplay = showAllActive
    ? enrolledCourses
    : enrolledCourses.slice(0, INITIAL_DISPLAY_COUNT);

  const featuredCoursesToDisplay = showAllFeatured
    ? featuredCoursesData
    : featuredCoursesData.slice(0, INITIAL_DISPLAY_COUNT);

  const categoriesToDisplay = showAllCategories
    ? categories
    : categories.slice(0, INITIAL_DISPLAY_COUNT);

  const isFeaturedSectionExpandable =
    featuredCoursesData.length > INITIAL_DISPLAY_COUNT;
  const isCategorySectionExpandable = categories.length > INITIAL_DISPLAY_COUNT;
  const isActiveSectionExpandable =
    enrolledCourses.length > INITIAL_DISPLAY_COUNT;

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
            onProgressUpdate={handleProgressUpdate}
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
            {featuredCoursesToDisplay.length > 0 ? (
              featuredCoursesToDisplay.map((course) => (
                <div key={course.id} className={styles.courseCard}>
                  <img
                    src={course.image}
                    alt={course.title}
                    className={styles.courseImage}
                    onError={(e) =>
                      (e.target.src =
                        "https://placehold.co/300x160/cccccc/000000?text=Course+Image")
                    }
                  />
                  <div className={styles.cardContent}>
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    <p className={styles.courseDescription}>
                      Taught by {course.instructor} | {course.duration}
                    </p>
                    <div className={styles.courseMeta}>
                      <span>⭐ {course.rating} Rating</span>
                      <span>{course.duration}</span>
                    </div>
                    <button
                      className={styles.enrollButton}
                      onClick={() => handleEnroll(course)}
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
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
          {activeCoursesToDisplay.length > 0 ? (
            activeCoursesToDisplay.map((course) => (
              <div key={course.id} className={styles.courseCard}>
                <img
                  src={course.image}
                  alt={course.title}
                  className={styles.courseImage}
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/300x160/cccccc/000000?text=Course+Image")
                  }
                />
                <div className={styles.cardContent}>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <p className={styles.courseDescription}>
                    Progress: {course.progress}%
                  </p>
                  <div className={styles.progressBarContainer}>
                    <div
                      className={styles.progressBar}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <button
                    className={styles.enrollButton}
                    onClick={() => handleStartLearning(course)}
                  >
                    {course.progress === 100
                      ? "Completed! Review"
                      : "Resume Learning"}
                  </button>
                  {course.progress === 100 && (
                    <p className={styles.completionBadge}>🎉 COURSE COMPLETE</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noResults}>
              You are not enrolled in any courses. Enroll below to start!
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
