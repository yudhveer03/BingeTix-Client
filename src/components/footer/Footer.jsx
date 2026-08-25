import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";




const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-col brand">
          <h2>🎬 BingeTix</h2>
          <p>
            Book tickets for the latest movies, <br></br> explore theatres near you and
            enjoy the <br></br> ultimate big screen experience.
          </p>

          {/* <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaXTwitter />
            <FaYoutube />
          </div> */}
        </div>

        <div className="footer-col">
          <h3>Book Tickets</h3>
          <ul>
          
            <li>Top Rated</li>
            <li>Offers & Discounts</li>
            <li>Gift Cards</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Theatres</h3>
          <ul>
            <li>PVR</li>
            <li>INOX</li>
            <li>Cinepolis</li>
            
          </ul>
        </div>

        <div className="footer-col">
          <h3>Support</h3>
          <ul>
            <li>FAQs</li>
            <li>Refund Policy</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Stay Updated</h3>

          <div className="newsletter">
            <input
              type="email"
              placeholder="Enter your email"
            />
            <button>Send</button>
          </div>
        </div>
      </div>

     
      <div className="footer-bottom">
        <p>© 2026 BingeTix. All Rights Reserved.</p>
        <br></br>

        {/* <div className="payments">
          <span>VISA</span>
          <span>MasterCard</span>
          <span>UPI</span>
          <span>Paytm</span>
          <span>GPay</span>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;