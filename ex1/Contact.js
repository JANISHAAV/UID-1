import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been received.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label><br />
        <label>Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label><br />
        <label>Message:
          <textarea name="message" value={formData.message} onChange={handleChange} required />
        </label><br />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
