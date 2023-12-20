// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <h4>Contact Us</h4>
            <p>Email: info@example.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div className="col-lg-4 col-md-6">
            <h4>Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#courses">Courses</a></li>
              <li><a href="#about">About</a></li>
              {/* Add more links as needed */}
            </ul>
          </div>
          <div className="col-lg-4">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#twitter"><i className="fab fa-twitter"></i></a>
              <a href="#linkedin"><i className="fab fa-linkedin"></i></a>
              {/* Add more social icons as needed */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
