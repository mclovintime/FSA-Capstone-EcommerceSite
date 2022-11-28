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
    <div className="contact-form">
    <h2>Contact Us</h2>
    <form onSubmit={handleSubmit}>
    <input
          type="text"
          name="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          label="First Name"
          placeholder="first name"
        />
    <input
          type="text"
          name="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          label="Last Name"
        />
    <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
    <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          label="Message"
        />
    <button className="contact-form-button" type="submit">
          Submit
        </button>
    </form>
    </div>
  )
}

export default ContactForm
