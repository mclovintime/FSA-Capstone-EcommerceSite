import "./contactForm.css";

import React, {useState} from 'react'

 const ContactForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        alert(
            "Thank you for reaching out! We'll be in touch shortly."
        );
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
    }


  return (
    <div id="whole">
    <div className="contact-form">
    <h2 id="header">We would love to hear from you!</h2>
    <div id="forms">
    <form onSubmit={handleSubmit}>
    <input 
          type="text"
          name="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          label="First Name"
          placeholder="First name"
        />
    <input
          type="text"
          name="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          label="Last Name"
          placeholder="Last name"
        />
    <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="Email"
        />
    <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          label="Message"
          placeholder="Message"
        />
        
    </form>
    <button className="contact-form-button" type="submit">
          Submit
        </button>
    </div>
    </div>
    </div>
  )
}

export default ContactForm
