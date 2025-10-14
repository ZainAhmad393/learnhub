import React, { useEffect, useState, useRef } from "react";
import landingpageimage from "../assets/lovely-teenage-girl-with-curly-hair-posing-yellow-tshirt-min 1.png";
import "../stylesheet/home.css";
import { FaPlayCircle } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import logoimage from "../assets/Group 235 (1).png";
import profileimage from "../assets/profile.jpg";
import teacherimage from "../assets/teacher.jpg";
import studentImage from "../assets/students.jpg";
import imagesassement from "../assets/Group 92.png";
import gradebook from "./../assets/grade book.png";
import discussionimage from "../assets/discoussion.png";
import videotatc from "../assets/7092068-hd_1920_1080_30fps.mp4";
import news1 from "../assets/onlineclass.jpg";
import news2 from "../assets/stduying.jpg";
import news3 from "../assets/student.jpg";
import imagefromnews from "../assets/latest.png";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CoursesCarousel from "../components/CoursesCarousel";
import Footer from "./Footer";
import HomeNavbar from "./HomeNavbar";
import { useAuth } from "./../context/AuthContext.jsx"; // 🌟 Auth Hook import
import { useNavigate } from "react-router-dom"; // Redirection ke liye

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // AuthContext se user ka data aur logout function lein

    // Agar user logged in nahi hai, to usay login page par bhej den
    // if (!isAuthenticated) {
    //     navigate('/');
    //     return null; 
    // }
    
  const newsItems = [
    {
      img: news1,
      title:
        "Class Technologies Inc. Closes $30 Million Series A Financing to Meet High Demand",
      desc: "Class Technologies Inc., the company that created Class, brings powerful tools to virtual classrooms and aims to make online education more interactive, engaging, and personal for students and teachers around the world.",
    },
    {
      img: news2,
      title:
        "Zoom’s earliest investors are betting millions on a better Zoom for schools",
      desc: "Zoom was never created to be a consumer product. Nonetheless, the education industry adopted it widely during the pandemic, leading to opportunities for new startups that build educational features specifically for teachers and students.",
    },
    {
      img: news3,
      title:
        "Former Blackboard CEO Raises $16M to Bring LMS Features to Zoom Classrooms",
      desc: "This year, investors have reaped big financial returns from betting on Zoom. Now, Class Technologies aims to combine the best of LMS tools directly inside the Zoom experience, improving how educators teach remotely.",
    },
  ];

  // Track expanded state for each news item
  const [expanded, setExpanded] = useState(Array(newsItems.length).fill(false));

  const toggleExpand = (index) => {
    const updated = [...expanded];
    updated[index] = !updated[index];
    setExpanded(updated);
  };

  // track the show more
  const paragraph = [
    "Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively with Zoom to enhance classroom collaboration. The platform transforms the traditional Zoom experience into a more structured and engaging virtual classroom by adding features like attendance tracking, assignment sharing, real-time quizzes, and breakout room management. Designed with both educators and students in mind, Class aims to bridge the gap between video conferencing and true online learning by making remote education more interactive, organized, and accessible.",
  ];

  const [showmore, setShowmore] = useState(Array(paragraph.length).fill(false));
  const toggleShowmore = (index) => {
    const newExpanded = [...showmore];
    newExpanded[index] = !newExpanded[index];
    setShowmore(newExpanded);
  };
  const boxRef = useRef(null);
  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const softwarecontentdiv = useRef(null);
  const softwarecontentdiv2 = useRef(null);
  const softwarecontentdiv3 = useRef(null);
  const sectionRef = useRef(null);
  const numbersRef = useRef([]);
  const pictureRef1 = useRef(null);
  const imageofstudent = useRef(null);
  const imageofteacher = useRef(null);
  useEffect(() => {
    const targets = [
      { value: 15, suffix: "K" },
      { value: 75, suffix: "%" },
      { value: 35, suffix: "" },
      { value: 27, suffix: "" },
      { value: 16, suffix: "" },
    ];

    numbersRef.current.forEach((el, i) => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: targets[i].value,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          el.textContent = Math.floor(obj.val) + targets[i].suffix;
        },
      });
    });
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current, // start anim when this section is visible
        start: "top 80%", // when top of section hits 80% of viewport
        end: "bottom 30%", // optional end point
        toggleActions: "play none none none",
        // other options: onEnter, onLeave, etc.
      },
    });
    tl1
      .to(softwarecontentdiv.current, { opacity: 1, y: 100 })
      .to(
        softwarecontentdiv2.current,
        { opacity: 1, y: 100, duration: 1 },
        "-=0.5"
      )
      .to(softwarecontentdiv3.current, { opacity: 1, y: 100 });
    const tl = gsap.timeline({
      repeat: 0,
      defaults: { duration: 1, ease: "power1.out", reversed: true },
    });

    tl.to(box1.current, { x: 100 })
      .to(box2.current, { y: 100 }, "-=0.5")
      .to(box3.current, { x: -100 });

    gsap.fromTo(
      boxRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1.5, ease: "power3.out" }
    );

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: pictureRef1.current, // start anim when this section is visible
        start: "top 80%", // when top of section hits 80% of viewport
        end: "bottom 30%", // optional end point
        toggleActions: "play none none none",
        // other options: onEnter, onLeave, etc.
      },
      repeat: 0,
      defaults: { duration: 1, ease: "power1.out", opacity: 0 },
    });
    tl2
      .to(imageofteacher.current, { y: 50, opacity: 1 })
      .to(imageofstudent.current, { y: 50, opacity: 1 }, "-=0.5");
  }, []);

  
  return (
    <>
      {/* Navbar */}
      {/* <nav className="navbar navbar-expand-lg navbarparent" style={{backgroundColor:"#49bbbd"}}>
        <div className="container-fluid ">
          <Link to="/" className="navbar-brand logo ">
            <img
              src={logoimage}
              alt="Not Found"
              width={"70px"}
              height={"50px"}
            />
          </Link>

          <div
            className="collapse navbar-collapse navbardesindiv"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav navbardesingul">
              <li className="nav-item">
                <Link to="/" className="nav-link  ">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/courses" className="nav-link  ">
                  Courses
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/careers" className="nav-link  ">
                  Careers
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/blogs" className="nav-link  ">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link  ">
                  About Us
                </Link>
              </li>
            </ul>

            <div className="landbutton">
              <button className="loginbtn">
                <Link to="/login" className="nav-link text-dark">
                  Login
                </Link>
              </button>
              <button className="signupbtn">
                <Link to="/signup" className="nav-link text-light">
                  SignUp
                </Link>
              </button>
            </div>
          </div>
        </div>
      </nav> */}
      <HomeNavbar />
      {/* Hero Section */}
      <div className="asideimageandcontent">
        
        <div className="container landingpage">
          <div className="texteddiv">
            <h3>
              <span className="studying">Studying</span> Online is now much
              easier
            </h3>
            <p>
              TOTC is an interesting platform that will teach you in a more
              interactive way.
            </p>
            <div className="joinandeatchnow">
              <Link className="joinforfreebtn" to="/courses">
                Join for free
              </Link>
              <button type="button" className="watchhowitworks">
                <FaPlayCircle className="playvideo" />
                <span className="text-dark ms-2">Watch how it works</span>
              </button>
            </div>
          </div>
        </div>

        <div className="landingasideimage">
          <img
            src={landingpageimage}
            ref={boxRef}
            alt="Not found"
            className="image-fluid sideimageoflandigpage"
          />

          <div className="contentboxeswithicons">
            <div className="boxes boxone" ref={box1}>
              <div className="content">
                <p className="parawithicon">
                  <FaCalendarAlt className="iconscontent" />
                </p>
                <p>250K</p>
              </div>
              <p className="belowertext">Assisted Students</p>
            </div>

            <div className="boxes boxtwo" ref={box2}>
              <div className="content">
                <p className="parawithicon">
                  <MdEmail className="iconscontent1" />
                </p>
                <p style={{ width: "100px" }}>Congratulations</p>
              </div>
              <p className="belowertext">Your admission completed</p>
            </div>

            <div className="boxes boxthree" ref={box3}>
              <div className="content">
                <p>
                  <img
                    src={profileimage}
                    alt="Not Found"
                    className="iconscontent2"
                    style={{ height: 70, width: 70 }}
                  />
                </p>
                <p style={{ width: "100px" }}>User Experience Class</p>
              </div>
              <Link to="/courses" className="joinnowclassbtn">Join Now</Link>
            </div>
          </div>
        </div>
      </div>

      {/* our success story section  */}
      <section>
        <div className="container-fluid oursuccess">
          <h3 className="fw-bold">Our Success</h3>
          <h5 className="mt-3">
            Empowering 250K+ learners to grow, achieve, and shine.
          </h5>

          <div className="progresscards">
            <div className="progreecard1">
              <h2
                className="progresscardsheading"
                ref={(el) => (numbersRef.current[0] = el)}
              >
                0
              </h2>
              <h5>Students</h5>
            </div>

            <div className="progreecard1">
              <h2
                className="progresscardsheading"
                ref={(el) => (numbersRef.current[1] = el)}
              >
                0
              </h2>
              <h5>Total Success</h5>
            </div>

            <div className="progreecard1">
              <h2
                className="progresscardsheading"
                ref={(el) => (numbersRef.current[2] = el)}
              >
                0
              </h2>
              <h5>Main Question</h5>
            </div>

            <div className="progreecard1">
              <h2
                className="progresscardsheading"
                ref={(el) => (numbersRef.current[3] = el)}
              >
                0
              </h2>
              <h5>Chief Experts</h5>
            </div>

            <div className="progreecard1">
              <h2
                className="progresscardsheading"
                ref={(el) => (numbersRef.current[4] = el)}
              >
                0
              </h2>
              <h5>Years of Experience</h5>
            </div>
          </div>
        </div>
      </section>
      {/* all in one cloud software section  */}
      <section>
        <div className="container-fluid cloudsoftwaresection">
          <h2 className="allinonesoftwareheading">
            All-In-One Cloud Software.
          </h2>
          <h5>
            TOTC is one powerful online software suite that combines all the
            tools needed to run a successful school or office.
          </h5>
          <div className="contentofcloudsoftware"></div>
          <div className="container my-5">
            <div className="row gx-5 cardsofsoftwarecloud" ref={sectionRef}>
              <div
                className="col-md-4 cardsoftwarecloudone"
                ref={softwarecontentdiv}
              >
                <h1>
                  <FaFileAlt className="fileicons" />
                </h1>
                <h3>
                  Online Billing, <br /> Invoicing, & Contracts
                </h3>
                <h6>
                  Simple and secure control of your organization’s financial and
                  legal transactions. Send customized invoices and contracts
                </h6>
              </div>
              <div
                className="col-md-4 cardsoftwarecloudone"
                ref={softwarecontentdiv2}
              >
                <h1>
                  <FaCalendarAlt className="calendaricons" />
                </h1>
                <h3>
                  Easy Scheduling & <br /> Attendance Tracking
                </h3>
                <h6>
                  Schedule and reserve classrooms at one campus or multiple
                  campuses. Keep detailed records of student attendance
                </h6>
              </div>
              <div
                className="col-md-4 cardsoftwarecloudone"
                ref={softwarecontentdiv3}
              >
                <h1>
                  <IoPeopleSharp className="peoplesicons" />
                </h1>
                <h3>
                  Customer Tracking <br /> Built-In System{" "}
                </h3>
                <h6>
                  Automate and track emails to individuals or groups. Skilline’s
                  built-in system helps organize your organization{" "}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* section for styling what is totc  */}
      <section>
        <div className="container-fluid whatistotc ">
          <h2>
            What is <span className="TOTCname">TOTC</span>
          </h2>
          <h6>
            TOTC is a platform that allows educators to create online classes
            whereby they can store the course materials online; manage
            assignments, quizzes and exams; monitor due dates; grade results and
            provide students with feedback all in one place.
          </h6>
          <div className="whatistotcforstuandteach" ref={pictureRef1}>
            <div className="teachersimages" ref={imageofteacher}>
              <img
                src={teacherimage}
                alt="Not Found"
                className="image-fluid teacherimagestyling "
              />
              <div className="teachercontent">
                <h3>FOR INSTRUCTORS</h3>
              </div>
            </div>
            <div className="studentimages" ref={imageofstudent}>
              <img
                src={studentImage}
                alt="Not Found"
                className="image-fluid studentimagestyling "
              />
              <div className="studentcontent">
                <h3>FOR STUDENTS</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* what you can do with totc in physical class section  */}
      <section>
        <div className="container whatcanwedophysically">
          <div className="row">
            <div className="col-md-6 everytingyoucandosection">
              <h2>
                Everything you can do in a physical classroom,
                <span className="TOTCname">you can do with TOTC</span>
              </h2>
              <h6>
                TOTC’s school management software helps traditional and online
                schools manage scheduling, attendance, payments and virtual
                classrooms all in one secure cloud-based system.
              </h6>
              <a href="">Learn more</a>
            </div>
            <div className="col-md-6">
              <video
                src={videotatc}
                className="TOTCvideo"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>
      </section>
      {/* assesment and quizes section */}
      <section>
        <div className="container quizesandassesmentparent">
          <div className="row">
            <div className="col-md-6">
              <img
                src={imagesassement}
                className="image-fluid assesmentimage"
                alt="Not Found"
              />
            </div>
            <div className="col-md-6 assesmenycontainer pt-5">
              <h2 className="assessmentquizestest">
                Assessments, <br /> <span className="TOTCname">Quizzes</span>,
                Tests
              </h2>
              <h6>
                Easily launch live assignments, quizzes, and tests. Student
                results are automatically entered in the online gradebook.
              </h6>
            </div>
          </div>
        </div>
      </section>
      {/* section for gradebook  */}
      <section>
        <div className="container quizesandassesmentparent">
          <div className="row">
            <div className="col-md-6 assesmenycontainer pt-5">
              <h2 className="assessmentquizestest">
                <span className="TOTCname">Class Management</span> <br /> Tools
                for Educators
              </h2>
              <h6>
                Class provides tools to help run and manage the class such as
                Class Roster, Attendance, and more. With the Gradebook, teachers
                can review and grade tests and quizzes in real-time.
              </h6>
            </div>
            <div className="col-md-6">
              <img
                src={gradebook}
                className="image-fluid assesmentimage"
                alt="Not Found"
              />
            </div>
          </div>
        </div>
      </section>
      {/* section for one to one discussion  */}
      <section>
        <div className="container quizesandassesmentparent">
          <div className="row">
            <div className="col-md-6">
              <img
                src={discussionimage}
                className="image-fluid assesmentimage"
                alt="Not Found"
              />
            </div>
            <div className="col-md-6 assesmenycontainer pt-5">
              <h2 className="assessmentquizestest">
                One-on-One <br /> <span className="TOTCname">Discussions</span>
              </h2>
              <h6>
                Teachers and teacher assistants can talk with students privately
                without leaving the Zoom environment.
              </h6>
            </div>
          </div>
        </div>
      </section>
      <CoursesCarousel />
      {/* latest news and resources section  */}
      <section>
        <div className="container sectionfornewsandlatest">
          <h2>Latest News and Resources</h2>
          <p className="headingparaoflatestnews">
            See the developments that have occurred to TOTC in the world
          </p>

          <div className="row g-5">
            {/* Left main news */}
            <div className="col-md-6 containerofnewssideleft">
              <img src={imagefromnews} alt="Not Found" />
              <button type="button">NEWS</button>
              <h3>
                Class adds $30 million to its balance sheet for a Zoom-friendly
                edtech solution
              </h3>
              <div>
                {paragraph.map((para, index) => (
                  <div key={index} style={{ marginBottom: "20px" }}>
                    <p>
                      {showmore[index] ? para : `${para.substring(0, 100)}...`}
                    </p>
                    <button onClick={() => toggleShowmore(index)}>
                      {showmore[index] ? "Show Less" : "Show More"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right dynamic news cards */}
            <div className="col-md-6 containerofnewssideright">
              {newsItems.map((item, index) => (
                <div className="imageandcontent" key={index}>
                  <img
                    src={item.img}
                    alt="Not found"
                    className="imagesofnews"
                  />
                  <div className="contentofimage">
                    <h3>{item.title}</h3>
                    <h6>
                      {expanded[index]
                        ? item.desc
                        : item.desc.slice(0, 30) + "..."}
                    </h6>
                    <button
                      onClick={() => toggleExpand(index)}
                      className="showmorebtn"
                    >
                      {expanded[index] ? "Show Less " : "Show More "}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* section for footer  */}
      <Footer />
    </>
  );
};

export default Home;
