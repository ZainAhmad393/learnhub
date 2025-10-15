 import React from 'react'
 import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './components/Home'
import Courses from './components/Courses'
import Careers from './components/Careers'
import Blog from './components/Blog'
import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Navbar from './components/Navbar'
import CourseDetail from './components/Coursedetails.jsx'
import UserProfile from './components/ProfilePage.jsx'
import LearningPath from './components/MyactiveLearningpath.jsx'
import Forgotpassword from './components/forgotpassword.jsx'
import ResetPasswordPage from './components/Resetpassword.jsx'
// React Toastify setup (agar aapne install kiya hai)
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
         <Route path="/resetpassword/:resetToken" element={<ResetPasswordPage />} /> 
      </Routes>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

     </div>
   )
 }
 
 export default App
