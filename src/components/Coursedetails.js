import code from '../assets/courses/code.jpg';
import code1 from '../assets/courses/code1.jpg';
import react from '../assets/courses/react.jpg';
import node from './../assets/courses/code5.jpg'
import code3 from '../assets/courses/code3.jpg';
import python from '../assets/courses/phython.jpg';
const courses = [
  {
    id: 1,
    title: "HTML Basics",
    desc: "Structure of the web.",
    details:
      "This course introduces you to the basic building blocks of the web — HTML. You'll learn how to structure web pages using tags, elements, and attributes. By the end, you’ll be able to create clean and well-structured pages that form the foundation of every website.",
    duration: "3 Weeks",
    level: "Beginner",
    lessons: 15,
    price: "Rs. 1,000",
    rating: 4.6,
    instructor: "Ali Khan",
    img:code,
  },
  {
    id: 2,
    title: "CSS Mastery",
    desc: "Design beautiful websites.",
    details:
      "Master the art of designing modern and responsive web pages with CSS. Learn about selectors, colors, typography, Flexbox, and Grid systems. By the end, you’ll be able to style and layout web pages like a pro designer.",
    duration: "4 Weeks",
    level: "Beginner to Intermediate",
    lessons: 20,
    price: "Rs. 1,200",
    rating: 4.8,
    instructor: "Fatima Noor",
    img: code1,
  },
  {
    id: 3,
    title: "JavaScript",
    desc: "Add logic and interactivity.",
    details:
      "Learn how to make websites interactive with JavaScript. This course covers variables, loops, functions, events, and the DOM. You’ll also get an introduction to ES6 concepts and APIs for modern JavaScript development.",
    duration: "5 Weeks",
    level: "Intermediate",
    lessons: 25,
    price: "Rs. 1,800",
    rating: 4.7,
    instructor: "Ahmed Raza",
    img: code3,
  },
  {
    id: 4,
    title: "React JS",
    desc: "Build modern web apps.",
    details:
      "React is one of the most popular frontend libraries in the world. In this course, you’ll learn about components, props, state, hooks, and how to build powerful single-page applications. You’ll also build a real project by the end of the course.",
    duration: "6 Weeks",
    level: "Intermediate to Advanced",
    lessons: 30,
    price: "Rs. 2,500",
    rating: 4.9,
    instructor: "Sara Malik",
    img: react ,
  },
  {
    id: 5,
    title: "Node JS",
    desc: "Backend with JavaScript.",
    details:
      "Take your JavaScript skills to the server side! Learn Node.js, Express, and MongoDB to build scalable backend systems and REST APIs. This course will help you understand the full MERN stack and how data flows between frontend and backend.",
    duration: "6 Weeks",
    level: "Intermediate",
    lessons: 28,
    price: "Rs. 2,200",
    rating: 4.8,
    instructor: "Hassan Tariq",
    img: node,
  },
  {
    id: 6,
    title: "Python",
    desc: "Learn the power of Python.",
    details:
      "A beginner-friendly course designed to teach you Python programming from scratch. You’ll learn about variables, loops, functions, data structures, and real-world projects like data analysis and automation.",
    duration: "5 Weeks",
    level: "Beginner",
    lessons: 22,
    price: "Rs. 1,500",
    rating: 4.9,
    instructor: "Zara Iqbal",
    img:python,
  },
];

export default courses;
