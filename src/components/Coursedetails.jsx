import React from "react";
import { useParams, Link } from "react-router-dom";
import courses from "./Coursedetails";
import styles from "../stylesheet/CourseDetail.module.css";
import { FaClock, FaUser, FaSignal, FaBook, FaStar } from "react-icons/fa";

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return (
      <div className={styles.notFound}>
        <h2>Course Not Found </h2>
        <Link to="/" className={styles.backBtn}>← Back to Courses</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={course.img} alt={course.title} className={styles.image} />

        <div className={styles.content}>
          <h2 className={styles.title}>{course.title}</h2>
          <p className={styles.desc}>{course.details}</p>

          <div className={styles.meta}>
            <p><FaClock /> <strong>Duration:</strong> {course.duration}</p>
            <p><FaSignal /> <strong>Level:</strong> {course.level}</p>
            <p><FaBook /> <strong>Lessons:</strong> {course.lessons}</p>
            <p><FaUser /> <strong>Instructor:</strong> {course.instructor}</p>
            <p><FaStar className={styles.star}/> <strong>Rating:</strong> {course.rating}</p>
          </div>

          <div className={styles.footer}>
            <h4 className={styles.price}>{course.price}</h4>
            <Link to="/" className={styles.btn}>← Back to All Courses</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
