import React, { useState } from 'react';
import heroimage from "./../assets/blog/header.png";
import styles from "./../stylesheet/blog.module.css";
import Navbar from "./Navbar";
import UIUXimage from "./../assets/courses/code.jpg";
import Reactimage from "./../assets/courses/react.jpg";
import PHPimage from "./../assets/courses/code5.jpg";
import javaScriptImage from "./../assets/courses/code4.jpg";
import htmlimage from './../assets/blog/html.jpg';
import cssimage from './../assets/blog/css.jpg';
import jsimage from './../assets/blog/js.jpg';
import reactimage from './../assets/blog/react.jpg';
import phpimage from './../assets/blog/php.jpg';
import laravelimage from './../assets/blog/laravel.jpg';
import bootsrapimage from './../assets/blog/bootstrap.jpg';
import { FaRegClock } from "react-icons/fa";
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Blog = () => { // Renamed component to start with capital letter
  const bookandimage = [
    { title: "UI & UX", img: UIUXimage },
    { title: "React", img: Reactimage },
    { title: "PHP", img: PHPimage },
    { title: "JavaScript", img: javaScriptImage },
  ];
  const coursesdesc = [
    {
      id: 1,
      imageofcourse: htmlimage,
      name: "HTML",
      duration: "3 Month",
      title: "Build the Web's Foundation",
      description: "Learn to structure web pages with HTML5, the essential language for building a website’s core framework from scratch.",
      price: "$80",
      dicount_price: "$100"
    },
    {
      id: 2,
      imageofcourse: cssimage,
      name: "CSS",
      duration: "3 Month",
      title: "Styling and Layouts for the Modern Web",
      description: "Master CSS to style and design beautiful, responsive websites. Learn everything from basic layouts to stunning visual effects.",
      price: "$120",
      dicount_price: "$150"
    },
    {
      id: 3,
      imageofcourse: jsimage,
      name: "JavaScript",
      duration: "3 Month",
      title: "Build Interactive Web Applications",
      description: "Unlock the power of JavaScript. This course covers core concepts to create interactive and dynamic web experiences and applications.",
      price: "$130",
      dicount_price: "$180"
    },
    {
      id: 4,
      imageofcourse: reactimage,
      name: "React JS",
      duration: "3 Month",
      title: "The Ultimate Guide to Modern UI Development",
      description: "Build powerful, component-based user interfaces with React.js. Learn how to create modern, single-page applications efficiently.",
      price: "$140",
      dicount_price: "$180"
    },
    {
      id: 5,
      imageofcourse: bootsrapimage,
      name: "Bootstrap Framework",
      duration: "3 Month",
      title: "Creating Responsive Websites",
      description: "Master Bootstrap to build fast, responsive, and mobile-first websites with its powerful grid system and pre-built components.",
      price: "$100",
      dicount_price: "$150"
    },
    {
      id: 6,
      imageofcourse: phpimage,
      name: "PHP ",
      duration: "3 Month",
      title: "Back-End Development for the Web",
      description: "Master PHP, the core language for server-side development. Learn to build dynamic, data-driven web applications from the ground up.",
      price: "$150",
      dicount_price: "$200"
    },
    {
      id: 7,
      imageofcourse: laravelimage,
      name: "Laravel",
      duration: "5 Month",
      title: "The Laravel Framework",
      description: "Dive into Laravel, the most popular PHP framework. Build robust, elegant, and scalable web applications with its powerful features and tools.",
      price: "$220",
      dicount_price: "$300"
    },
  ];

  const [visiblecount, setvisiblecount] = useState(4);
  const handleSeeall = () => {
    setvisiblecount(visiblecount === 4 ? coursesdesc.length : 4);
  };

  return (
    <>
      <Navbar />
      <header>
        <div className={styles.containerMainOfBlog}>
          <div className="container">
            <div className="row">
              <div className={`col-md-6 ${styles.contentOfHeroSectionOfBlogs}`}>
                <h6 className={styles.heroSubheading}>
                  By Themadbrains in <span className={styles.inspiration}>inspiration</span>
                </h6>
                <h2 className={styles.heroHeading}>
                  Why Swift UI Should Be on the Radar of Every Mobile Developer
                </h2>
                <p className={styles.heroParagraph}>
                  Tired of writing complex code? SwiftUI is a game-changer for
                  Apple developers. This modern framework lets you build
                  beautiful, native apps with less effort, making it a critical
                  skill for anyone serious about mobile development.
                </p>
                   <Link className={styles.startBtnOfBlogHero} to="/courses">
                  Start Learning now
                   </Link>
              </div>
              <div className="col-md-6">
                <img
                  src={heroimage}
                  alt="Not Found"
                  className={`${styles.heroSectionImageOfBlog} image-fluid w-100`}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* section for reading blogs */}
      <section>
        <div className={`${styles.containerOfBlogCards} container-fluid`}>
          <h2 className={styles.readingBlogList}>Reading blog list</h2>
          <div className={styles.imagesAndTheirContentOfCourses}>
            {bookandimage.map((course, index) => (
              <div key={index} className={styles.courseCard}>
                <div className={styles.imageChildOfBlog}>
                  <img src={course.img} alt="Not Found" className={styles.imageOfBlogschild} />
                </div>
                <button className={styles.titleOfCourses}>{course.title}</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* section for courses details */}
      <section>
        <div className={`${styles.parentOfCourseDetailsInBlog} container-fluid`}>
          <div className={styles.sectionHeader}>
            <h2>Marketing Articles</h2>
            <button className={styles.seeAllBtn} onClick={handleSeeall}>
              {visiblecount === 4 ? "See All" : "See Less"}
            </button>
          </div>
          <div className={styles.containerOfBuyingCoursesAndDetails}>
            {coursesdesc.slice(0, visiblecount).map((course, index) => (
              <div key={index} className={styles.coursesDescriptionAndDetails}>
                <div className={styles.imagesOfDescriptionAndDetails}>
                  <img src={course.imageofcourse} alt="Not Found" className={`${styles.imgOfCoursesInBlog} image-fluid`} />
                  <div className={styles.descriptionContainer}>
                    <div className={styles.nameAndDuration}>
                      <p className={styles.courseName}>{course.name}</p>
                      <p className={styles.courseDuration}>
                        <FaRegClock className={styles.clockIcons} /> {course.duration}{" "}
                      </p>
                    </div>
                    <h2 className={styles.courseTitle}>{course.title}</h2>
                    <p className={styles.courseDescription}>{course.description}</p>
                    <div className={styles.priceAndDiscountPrice}>
                      <p className={styles.coursePrice}>{course.price}</p>
                      <p className={styles.courseDiscountPrice}>{course.dicount_price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blog;