import React, { useState } from 'react';
import shoeHeroBg from '../../assets/shoes.png'; // Hero Section Background

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setErrorMessage(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setErrorMessage('Server connection error. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      {/* --- Internal CSS Style Tag --- */}
      <style>{`
        .contact-container {
          font-family: 'Outfit', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          line-height: 1.6;
          background-color: #f8f9fa;
          width: 100%;
        }

        /* 1. Premium Hero Section */
        .contact-hero-premium {
          position: relative;
          width: 100%;
          padding: 80px 20px;
          background: linear-gradient(135deg, #111 0%, #1e1e2d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
          border-bottom: 3px solid var(--color-primary-orange, #ff6b00);
          overflow: hidden;
        }

        .contact-hero-premium::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.2) 0%, rgba(255, 107, 0, 0) 70%);
          top: -100px;
          right: -100px;
          z-index: 1;
        }

        .contact-hero-premium::after {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.1) 0%, rgba(255, 107, 0, 0) 70%);
          bottom: -150px;
          left: -100px;
          z-index: 1;
        }

        .hero-premium-content {
          max-width: 800px;
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        .hero-tag-badge {
          display: inline-block;
          padding: 6px 14px;
          background: rgba(255, 107, 0, 0.1);
          border: 1px solid rgba(255, 107, 0, 0.2);
          color: var(--color-primary-orange, #ff6b00);
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          border-radius: 30px;
          margin-bottom: 20px;
        }

        .hero-premium-content h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin: 0 0 15px 0;
          letter-spacing: -1.5px;
          text-transform: uppercase;
          background: linear-gradient(to right, var(--color-primary-orange, #ff6b00), #ffb88c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-premium-content p {
          font-size: 1.25rem;
          font-weight: 400;
          margin: 0 0 25px 0;
          letter-spacing: 0.5px;
          color: #b0b0c0;
          line-height: 1.5;
        }

        .premium-breadcrumb {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #6b7280;
        }

        .premium-breadcrumb span {
          color: #9ca3af;
        }

        /* 2. Layout Wrapper */
        .contact-content-section {
          max-width: 1200px;
          margin: 60px auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 50px;
        }

        @media (max-width: 900px) {
          .contact-content-section {
            grid-template-columns: 1fr;
            gap: 40px;
            margin: 40px auto;
          }
        }

        /* 3. Info Cards Column */
        .info-column {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .contact-info-card {
          background: #fff;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-left: 5px solid var(--color-primary-orange, #ff6b00);
        }

        .contact-info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
        }

        .info-card-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .info-icon {
          font-size: 1.8rem;
          background: var(--color-primary-orange-light, #fff0e5);
          width: 50px;
          height: 50px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary-orange, #ff6b00);
        }

        .info-card-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #111;
          margin: 0;
          text-transform: uppercase;
        }

        .info-card-body p {
          margin: 5px 0;
          color: #666;
          font-size: 1rem;
        }

        /* 4. Form Column */
        .form-column {
          background: #fff;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 600px) {
          .form-column {
            padding: 25px;
          }
        }

        .form-title {
          font-size: 1.8rem;
          color: #111;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .form-subtitle {
          color: #777;
          font-size: 0.95rem;
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 20px;
          text-align: left;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          color: #444;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          background-color: #fafafa;
          color: #333 !important;
        }

        .form-input:focus, .form-textarea:focus {
          border-color: var(--color-primary-orange, #ff6b00);
          box-shadow: 0 0 0 3px var(--color-primary-orange-light, rgba(255, 107, 0, 0.1));
          background-color: #fff;
          color: #333 !important;
        }

        .form-textarea {
          height: 150px;
          resize: vertical;
        }

        .submit-btn {
          background-color: var(--color-primary-orange, #ff6b00);
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 8px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s;
          box-shadow: 0 5px 15px rgba(255, 107, 0, 0.3);
          margin-top: 10px;
          width: 100%;
        }

        .submit-btn:hover {
          background-color: var(--color-primary-orange-hover, #e56000);
        }

        .submit-btn:active {
          transform: scale(0.98);
        }

        /* Success Message styling */
        .success-card {
          text-align: center;
          padding: 40px 20px;
        }

        .success-icon {
          font-size: 4rem;
          color: #10b981;
          margin-bottom: 20px;
        }

        .success-title {
          font-size: 1.8rem;
          color: #111;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .success-text {
          color: #555;
          font-size: 1.05rem;
          margin-bottom: 25px;
        }

        .reset-btn {
          background-color: #f3f4f6;
          color: #4b5563;
          border: 1px solid #d1d5db;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .reset-btn:hover {
          background-color: #e5e7eb;
        }
      `}</style>

      {/* 1. Hero Section */}
      <div className="contact-hero-premium">
        <div className="hero-premium-content">
          <span className="hero-tag-badge">Get In Touch</span>
          <h1>Contact Us</h1>
          <p>We'd Love to Hear From You. Get In Touch With Our Team.</p>
          <div className="premium-breadcrumb">Home &nbsp;/&nbsp; <span>Contact Us</span></div>
        </div>
      </div>

      {/* 2. Content Layout Grid */}
      <div className="contact-content-section">
        {/* Left Column: Info Cards */}
        <div className="info-column">
          
          <div className="contact-info-card">
            <div className="info-card-header">
              <div className="info-icon">📞</div>
              <h3 className="info-card-title">Call Us</h3>
            </div>
            <div className="info-card-body">
              <p>Mobile: +94 78 988 8877</p>
              <p>Hotline: +94 76 892 3456</p>
              <p>Operating Hours: Mon - Sat, 9:00 AM - 7:00 PM</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="info-card-header">
              <div className="info-icon">✉️</div>
              <h3 className="info-card-title">Email Us</h3>
            </div>
            <div className="info-card-body">
              <p>General Support: support@shoestore.lk</p>
              <p>Corporate Inquiries: info@shoestore.lk</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="info-card-header">
              <div className="info-icon">📍</div>
              <h3 className="info-card-title">Our Stores</h3>
            </div>
            <div className="info-card-body">
              <p style={{ fontWeight: 'bold', color: '#333' }}>Matara Branch:</p>
              <p>Isuru Plaza, Matara, Sri Lanka</p>
              <p style={{ fontWeight: 'bold', color: '#333', marginTop: '10px' }}>Kandy Branch:</p>
              <p>161, D.S. Senanayake Veediya, Kandy, Sri Lanka</p>
            </div>
          </div>

        </div>

        {/* Right Column: Form */}
        <div className="form-column">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <h2 className="form-title">Send a Message</h2>
              <p className="form-subtitle">Fill out the form below, and we'll get back to you within 24 hours.</p>

              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Dilan Perera" 
                  className="form-input" 
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="dilanperera@gmail.com" 
                  className="form-input" 
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject"
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?" 
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea 
                  id="message"
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..." 
                  className="form-textarea" 
                  required
                ></textarea>
              </div>

              {errorMessage && (
                <div style={{ color: '#dc2626', backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '10px 15px', borderRadius: '8px', marginBottom: '15px', fontSize: '0.9rem' }}>
                  {errorMessage}
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message ➔'}
              </button>
            </form>
          ) : (
            <div className="success-card">
              <div className="success-icon">✓</div>
              <h2 className="success-title">Thank You!</h2>
              <p className="success-text">Your message has been sent successfully. We will get in touch with you shortly.</p>
              <button onClick={() => setIsSubmitted(false)} className="reset-btn">Send Another Message</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
