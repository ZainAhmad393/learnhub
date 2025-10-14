import React, { useRef } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import styles from "./CoursesCarousel.module.css";
import HtmlImage from "../assets/courses/code.jpg";
import CssImage from "../assets/courses/code1.jpg";
import JsImage from "../assets/courses/code2.jpg";
import ReactImage from "../assets/courses/react.jpg";
import NodeImage from "../assets/courses/code3.jpg";
import PhythonImage from "../assets/courses/phython.jpg";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
const CoursesCarousel = () => {
  const scrollRef = useRef(null);

  const courses = [
    {
      id: 1,
      title: "HTML Basics",
      desc: "Structure of the web.",
      rate: 4.7,
      img: HtmlImage,
    },
    {
      id:2,
      title: "CSS Mastery",
      desc: "Design beautiful websites.",
      rate: 4.8,
      img: CssImage,
    },
    {
      id:3,
      title: "JavaScript",
      desc: "Add logic and interactivity.",
      rate: 4.7,
      img: JsImage,
    },
    {
      id:4,
      title: "React JS",
      desc: "Build modern web apps.",
      rate: 4.5,
      img: ReactImage,
    },
    {
      id:5,
      title: "Node JS",
      desc: "Backend with JavaScript.",
      rate: 4.9,
      img: NodeImage,
    },
    {
      id:6,
      title: "Python",
      desc: "Learn the power of Python.",
      rate: 4.7,
      img: PhythonImage,
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className={styles.ratingStarIcon} />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <FaStar
          key="half"
          className={`${styles.ratingStarIcon} ${styles.halfStar}`}
        />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar key={`empty-${i}`} className={styles.ratingStarIcon} />
      );
    }
    return stars;
  };

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.exploreCoursesHeading}>Explore Our Courses</h2>
      <div className={styles.carouselWrapper}>
        <button
          className={`${styles.arrowBtn} ${styles.left}`}
          onClick={() => scroll("left")}
        >
          <MdArrowBackIos />
        </button>

        <div className={styles.carousel} ref={scrollRef}>
          {courses.map((course, index) => (
            <div className={styles.courseCard} key={index}>
              <img
                src={course.img}
                className={styles.carouselImage}
                alt={course.title}
              />
              <div className={styles.cardContent}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <p className={styles.courseDescription}>{course.desc}</p>
                <div className={styles.ratingContainer}>
                  <span className={styles.ratingValue}>{course.rate}</span>
                  <div className={styles.starsIcons}>
                    {renderStars(course.rate)}
                  </div>
                </div>
                  <Link
                    to={`/course/${course.id}`}
                    className="btn btn-primary w-100 rounded-pill fw-semibold p-2 mt-3"
                  >
                    View Details
                  </Link>
              </div>
            </div>
          ))}
        </div>

        <button
          className={`${styles.arrowBtn} ${styles.right}`}
          onClick={() => scroll("right")}
        >
          <MdArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default CoursesCarousel;
