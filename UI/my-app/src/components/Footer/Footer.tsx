import React from 'react'
import '../../dist/Footer.css'
import { Link } from 'react-router-dom'
import BrandLogo from '../../assets/BrandLogo1.png'
//import BrandLogo from '../../assets/Color logo with background.png';

function Footer() {
  return (
    <>
        <footer>
            <div className="footer-left">
              <img src={BrandLogo} alt='Brand Logo' className='footer-brandlogo' />
            <h6>Campion is the most comprehensive resource for beautiful private campsites.</h6>
            <p>Discover and reserve tent camping, RV parks, cabins, treehouses, and glamping.</p>
            <br />
              <p>© 2023 Campion, Inc. All rights reserved.</p>
            </div>
            <div className="footer-right">
              <div className='footer-col1'>
                <h6>Explore</h6>
                <Link to='/'>Home</Link>
                <Link to='/campgrounds'>Campgrounds</Link>
                <Link to='/campgrounds/new'>New Campground</Link>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
              </div>
              <div className="footer-col2">
                <h6>About Us</h6>
                <Link to='/policies'>Policies and Rules</Link>
                <Link to='/contact'>Contact Us</Link>
                <Link to='/faq'>FAQ</Link>
              </div>
            </div>
        </footer>
    </>
  )
}

export default Footer