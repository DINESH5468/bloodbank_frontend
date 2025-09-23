import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name:"", email:"", message:"" });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); alert("Message sent!"); setFormData({ name:"", email:"", message:"" }); }

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>If you have any queries or feedback, feel free to reach out!</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required/>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
        <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required/>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
