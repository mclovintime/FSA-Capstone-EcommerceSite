import React from 'react'
import ContactForm from './ContactForm'
import { Outlet, Link } from 'react-router-dom'
import "./Footer.css";


const Footer = () => {
  return (
    <footer className="footer">
        <Link to= "/ContactForm">Contact Us</Link>
        <Outlet></Outlet>

    </footer>
    
    )
}

export default Footer
