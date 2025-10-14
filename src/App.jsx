 import React from 'react'
 import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './components/Home'
import Courses from './components/Courses'
import Careers from './components/Careers'
import Blog from './components/Blog'
import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import CourseDetail from './components/Coursedetails.jsx'
import UserProfile from './components/ProfilePage.jsx'
import LearningPath from './components/MyactiveLearningpath.jsx'
import Forgotpassword from './components/forgotpassword.jsx'
 const App = () => {
   return (
     <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blogs" element={<Blog/>} />
        <Route path="/aboutus" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/learningpath/:title" element={<LearningPath />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
      </Routes>
     </div>
   )
 }
 
 export default App
