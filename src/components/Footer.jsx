import React from 'react'
import logoimage from '../assets/Group 235 (1).png';
import "./../stylesheet/footer.css"
const Footer = () => {
  return (
    <>
    <div className=" footertopcontainer">
     <div className="footerheadingandcontent">
         <img src={logoimage} alt="Not Found" className='image-fluid footerimage' />
         <div className="vertical-line"></div>
      <h2 className='headingtwooffooter'>Virtual Class for Zoom</h2>
     </div>
     <div className="subscribeus">
        <h4 className='subscribeheading'>Subscribe to get our Newsletter</h4>
        <div className="inputandtext">
            <form method='POST' className='formofooter'>
                <input type="email" name="email" id="email" className='footeremail' placeholder='Your Email' />
                <button type='submit' className='subscribebtn'>Subscribe</button>
            </form>
        </div>
     </div>
     <div className="careersprivacypolicy">
        <p>Careers</p> 
         <div className="vertical-line2"></div>
        <p>Privacy Policy</p>
         <div className="vertical-line2"></div>
        <p>Terms & Conditions</p>
     </div>
     <div className="copyright">
        <p  className='copyright'>© 2021 Class Technologies Inc. </p>
     </div>
    </div>
    </>
  )
}

export default Footer
