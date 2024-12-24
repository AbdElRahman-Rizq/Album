'use client'
import { useState } from 'react'

export const BookingForm = ({ 
  isPending, 
  title, 
  inquire, 
  inquireData, 
  children 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    ...inquireData
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    inquire(formData);
  };

  return (
    <div className="booking-form">
      <h3>{title}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        {children}
        <div className="form-group">
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button 
          type="submit" 
          className="submit-button" 
          disabled={isPending}
        >
          {isPending ? 'Sending...' : 'Send Inquiry'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
