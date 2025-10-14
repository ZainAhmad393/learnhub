import React from 'react'
import './../stylesheet/HomeNavbar.css'
import logoimage from './../assets/Group 235 (1).png'
import { Link } from 'react-router-dom'
const HomeNavbar = () => {
  return (
    < >
        <nav>
              <div className="navcontent">
                <div className="img">
                  <img src={logoimage} alt="Not Found" className="logoimage" />
                </div>
                <div className="links">
                  <ul className="linksgroup">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                      <li>
                      <Link to="/courses">Courses</Link>
                    </li>
                    <li>
                      <Link to="/careers">Careers</Link>
                    </li>
                    <li>
                      <Link to="/blogs">Blog</Link>
                    </li>
                    <li>
                      <Link to="/aboutus">About Us</Link>
                    </li>
                  </ul>
                </div>
                <div className="buttons">
                  <Link to="/login">
                    <button type="button" className="loginbtn">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                  <button type="button" className="signup">
                    Signup
                  </button>
                  </Link>
                </div>
              </div>
            </nav>
    </ >
  )
}

export default HomeNavbar
