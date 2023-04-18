import React from "react";
import ContactForm from "./ContactForm";
import { Outlet, Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer">
        <Link id="contactLink" to="/ContactForm">
          Contact Us
        </Link>

        <Outlet></Outlet>
      </footer>
    </div>
  );
};

export default Footer;
