import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      {/* --- Internal CSS Style Tag --- */}
      <style>{`
        .privacy-container {
          font-family: 'Outfit', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          line-height: 1.7;
          background-color: #f8f9fa;
          width: 100%;
          min-height: 100vh;
        }

        /* 1. Hero Section */
        .privacy-hero-premium {
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

        .privacy-hero-premium::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.2) 0%, rgba(255, 107, 0, 0) 70%);
          top: -100px;
          left: -100px;
          z-index: 1;
        }

        .privacy-hero-premium::after {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.1) 0%, rgba(255, 107, 0, 0) 70%);
          bottom: -150px;
          right: -100px;
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
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
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

        /* 2. Core Layout & Card Section */
        .privacy-content-section {
          max-width: 1000px;
          margin: 50px auto 80px auto;
          padding: 0 20px;
        }

        .legal-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 35px 40px;
          margin-bottom: 25px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.03);
          border: 1px solid #e2e8f0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .legal-card:hover {
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
        }

        .legal-card-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid #f1f5f9;
        }

        .section-number {
          background: rgba(255, 107, 0, 0.1);
          color: #ff6b00;
          font-weight: 800;
          font-size: 0.95rem;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .legal-card-header h2 {
          font-size: 1.35rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .legal-card p {
          font-size: 1rem;
          color: #475569;
          margin-bottom: 15px;
          line-height: 1.7;
        }

        .legal-card p:last-child {
          margin-bottom: 0;
        }

        .contact-info-box {
          background: #f8fafc;
          border-left: 4px solid #ff6b00;
          padding: 20px;
          border-radius: 0 12px 12px 0;
          margin-top: 15px;
        }

        .contact-info-box p {
          margin-bottom: 8px;
          color: #334155;
        }

        @media (max-width: 768px) {
          .hero-premium-content h1 {
            font-size: 2.5rem;
          }
          .privacy-hero-premium {
            padding: 60px 15px;
          }
          .legal-card {
            padding: 25px 20px;
          }
        }
      `}</style>

      {/* 1. Hero Section */}
      <div className="privacy-hero-premium">
        <div className="hero-premium-content">
          <span className="hero-tag-badge">Your Privacy Matters</span>
          <h1>Privacy Policy</h1>
          <p>We are committed to protecting your personal information and being transparent about how we process your data.</p>
          <div className="premium-breadcrumb">Home &nbsp;/&nbsp; <span>Privacy Policy</span></div>
        </div>
      </div>

      {/* 2. Main Content Section */}
      <div className="privacy-content-section">
        {/* Section 1 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">01</span>
            <h2>Information We Collect</h2>
          </div>
          <p>
            At ShoeStore Sri Lanka, we collect various types of personal information when you register an account, browse our online footwear catalog, place an order, or interact with customer service. This includes contact details such as your full name, shipping address, email address, and mobile phone number.
          </p>
          <p>
            We also collect transactional details including order history, payment verification references, footwear shoe size preferences, browsing interaction logs, device IP address, and browser cookies necessary to optimize your online shopping experience.
          </p>
        </div>

        {/* Section 2 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">02</span>
            <h2>How We Use Your Information</h2>
          </div>
          <p>
            The primary purpose of collecting your information is to process, package, and deliver your footwear orders directly to your address anywhere in Sri Lanka. We also use your contact details to send essential order updates, courier tracking links, invoice receipts, and account verification messages.
          </p>
          <p>
            Additionally, with your consent, we utilize your preferences to send promotional updates, seasonal shoe collection launches, discount offers, and personalized product recommendations. We continually analyze aggregated, non-identifiable user behavior data to improve website functionality and product selection.
          </p>
        </div>

        {/* Section 3 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">03</span>
            <h2>Information Sharing</h2>
          </div>
          <p>
            We respect your confidentiality and do not sell, rent, or lease your personal information to third-party marketing companies. We only share necessary personal data with trusted third-party service providers who assist us in operating our e-commerce platform and fulfilling your orders.
          </p>
          <p>
            These include registered Sri Lankan courier services for parcel delivery, secure payment gateway processing partners, and IT hosting infrastructure providers. All third-party providers are contractually obligated to maintain strict confidentiality and safeguard your information exclusively for authorized services.
          </p>
        </div>

        {/* Section 4 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">04</span>
            <h2>Cookies & Tracking</h2>
          </div>
          <p>
            ShoeStore uses standard browser cookies, local storage, and analytical web beacons to enhance platform navigation and remember items stored in your shopping cart. Cookies enable our website to recognize returning users, preserve session state, and deliver a smooth checkout process.
          </p>
          <p>
            You have full control over cookie preferences through your web browser settings. You can choose to block or delete cookies at any time; however, disabling certain functional cookies may impact specific interactive features of our online store, such as remaining logged in or saving items in your cart.
          </p>
        </div>

        {/* Section 5 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">05</span>
            <h2>Data Security</h2>
          </div>
          <p>
            We enforce robust administrative, technical, and physical security safeguards to protect your personal data against unauthorized access, loss, alteration, or disclosure. All sensitive data transmitted online, including credit card numbers and login credentials, is encrypted using industry-standard Secure Socket Layer (SSL/TLS) technology.
          </p>
          <p>
            Our databases are protected behind firewalls with restricted administrative access rights. While we take every reasonable precaution to protect your data, no method of transmission over the Internet or electronic storage is 100% secure, and we encourage customers to maintain strong passwords.
          </p>
        </div>

        {/* Section 6 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">06</span>
            <h2>Your Rights</h2>
          </div>
          <p>
            As a user of ShoeStore, you hold the right to access, update, correct, or delete your personal account profile details at any time through your customer profile dashboard or by contacting our privacy compliance team.
          </p>
          <p>
            You also reserve the right to opt out of promotional newsletters or SMS marketing campaigns at any point by clicking the 'Unsubscribe' link included in our emails or by requesting removal directly from our customer support center.
          </p>
        </div>

        {/* Section 7 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">07</span>
            <h2>Children's Privacy</h2>
          </div>
          <p>
            Our website and online footwear store are intended for general audiences and are not directed towards children under the age of 18 without parental supervision. We do not knowingly collect or solicit personal information from minors.
          </p>
          <p>
            If we become aware that a child under 18 has provided us with personal data without verified parental consent, we will promptly delete such information from our records and terminate any associated account.
          </p>
        </div>

        {/* Section 8 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">08</span>
            <h2>Changes to This Policy</h2>
          </div>
          <p>
            We may update our Privacy Policy periodically to reflect changes in our operational procedures, legal regulations, or enhanced security standards. Any revisions will be published directly on this page with an updated modification date at the top of the policy.
          </p>
          <p>
            We encourage you to review this Privacy Policy periodically to stay informed about how ShoeStore is protecting your information. Continued usage of our website after policy revisions constitutes acceptance of the revised privacy terms.
          </p>
        </div>

        {/* Section 9 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">09</span>
            <h2>Contact Us</h2>
          </div>
          <p>
            If you have questions, feedback, concerns, or requests regarding this Privacy Policy or your personal information handling, please feel free to reach out to our privacy officer:
          </p>
          <div className="contact-info-box">
            <p><strong>Store Name:</strong> ShoeStore Sri Lanka</p>
            <p><strong>Data Privacy Officer:</strong> Privacy & Compliance Department</p>
            <p><strong>Address:</strong> No. 145, Galle Road, Colombo 03, Sri Lanka</p>
            <p><strong>Hotline:</strong> +94 11 234 5678 / +94 77 123 4567</p>
            <p><strong>Email:</strong> privacy@shoestore.lk / support@shoestore.lk</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
