import React, { useState, useEffect } from "react";
import styles from "./../stylesheet/CareersPage.module.css";
import {
  FaBriefcase,
  FaCode,
  FaChartBar,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { initialJobData, benefitsData } from "./../components/JobData"; // Import dummy data
import Navbar from "./Navbar";
import Footer from "./Footer";

const INITIAL_DISPLAY_COUNT = 3;

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- State for Show/Hide Sections ---
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [showAllBenefits, setShowAllBenefits] = useState(false);

  // --- Data Fetching Mimicry ---
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setJobs(initialJobData);
      setIsLoading(false);
    }, 500);
  }, []);

  // --- Slicing Logic ---
  const jobsToDisplay = showAllJobs
    ? jobs
    : jobs.slice(0, INITIAL_DISPLAY_COUNT);

  const benefitsToDisplay = showAllBenefits
    ? benefitsData
    : benefitsData.slice(0, INITIAL_DISPLAY_COUNT);

  const isJobSectionExpandable = jobs.length > INITIAL_DISPLAY_COUNT;
  const isBenefitSectionExpandable =
    benefitsData.length > INITIAL_DISPLAY_COUNT;

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      {/* Section 1: Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeading}>Your Next Chapter Starts Here.</h1>
          <p className={styles.heroSubtext}>
            Join LearnHub and help us shape the future of online education.
            We're looking for passionate individuals ready to make a real
            impact.
          </p>
          <button className={styles.applyBtn}>Explore Open Roles</button>
        </div>
      </section>

      {/* Section 2: Core Values / Culture */}
      <section className={styles.valuesSection}>
        <h2 className={styles.sectionTitle}>Our Core Values</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <FaCode size={40} className={styles.valueIcon} />
            <h3>Innovation First</h3>
            <p className="w-100">We push boundaries to ensure our platform stays cutting-edge.</p>
          </div>
          <div className={styles.valueCard}>
            <FaUsers size={40} className={styles.valueIcon} />
            <h3>Learner Obsession</h3>
            <p className="w-100">
              Everything we build is designed to create the best student
              experience.
            </p>
          </div>
          <div className={styles.valueCard}>
            <FaChartBar size={40} className={styles.valueIcon} />
            <h3>Growth Mindset</h3>
            <p className="w-100">
              We encourage continuous learning, both for our users and our team.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Job Listings (Show More/Less) */}
      <section className={styles.listingsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Current Openings ({jobs.length})
          </h2>
          {isJobSectionExpandable && (
            <button
              className={styles.toggleButton}
              onClick={() => setShowAllJobs(!showAllJobs)}
            >
              {showAllJobs ? (
                <>
                  <FaChevronUp size={16} /> Show Less
                </>
              ) : (
                <>
                  <FaChevronDown size={16} /> Show All
                </>
              )}
            </button>
          )}
        </div>

        {isLoading ? (
          <p className={styles.loadingMessage}>Loading job opportunities...</p>
        ) : (
          <div className={styles.jobGrid}>
            {jobsToDisplay.map((job) => (
              <div key={job.id} className={styles.jobCard}>
                <h3 className={styles.jobTitle}>{job.title}</h3>
                <p className={styles.jobDept}>{job.department}</p>
                <div className={styles.jobMeta}>
                  <span>
                    <FaMapMarkerAlt /> {job.location}
                  </span>
                  <span>
                    <FaBriefcase /> {job.type}
                  </span>
                  <span>
                    <FaClock /> {job.posted}
                  </span>
                </div>
                <button className={styles.jobDetailBtn}>View & Apply</button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 4: Benefits (Show More/Less) */}
      <section className={styles.benefitsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Perks & Benefits</h2>
          {isBenefitSectionExpandable && (
            <button
              className={styles.toggleButton}
              onClick={() => setShowAllBenefits(!showAllBenefits)}
            >
              {showAllBenefits ? (
                <>
                  <FaChevronUp size={16} /> Show Less
                </>
              ) : (
                <>
                  <FaChevronDown size={16} /> Show All
                </>
              )}
            </button>
          )}
        </div>
        <div className={styles.benefitsGrid}>
          {benefitsToDisplay.map((benefit, index) => (
            <div key={index} className={styles.benefitTile}>
              <benefit.icon size={30} className={styles.benefitIcon} />
              <h4>{benefit.title}</h4>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Careers;
