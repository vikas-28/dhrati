import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h1>धृti</h1>
          <p>Dhrati Mahila Farmer Producer Co. Ltd.</p>
          <p>WHERE WOMEN SHINE</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/buyproducts">Shop</a>
            </li>
            <li>
              <a href="/sell">Sell</a>
            </li>
            <li>
              <a href="/our-story">Our Story</a>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: contact@dhratifarmers.com</p>
          <p>Phone: +91-0000000000</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2025 Dhrati Mahila Farmer Producer Co. Ltd. | All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
