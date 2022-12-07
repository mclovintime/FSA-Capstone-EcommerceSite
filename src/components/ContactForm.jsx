import "./contactForm.css";

import React, { useState } from "react";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    alert("Thank you for reaching out! We'll be in touch shortly.");
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="contact-form">
      <h2 className="cf-header">We would love to hear from you!</h2>
      <form onSubmit={handleSubmit} className="contact-input">
        <input
          type="text"
          name="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          label="First Name"
          placeholder="First name"
          className="contactFirstName"
        />
        <input
          type="text"
          name="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          label="Last Name"
          placeholder="Last name"
          className="contactLastName"
        />
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="Email"
          className="contactEmail"
        />
        <textarea
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          label="Message"
          placeholder="Message"
          className="contactMessage"
        />
        <button className="contact-form-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
