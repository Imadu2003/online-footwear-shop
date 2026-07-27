import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      {/* --- Internal CSS Style Tag --- */}
      <style>{`
        .terms-container {
          font-family: 'Outfit', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          line-height: 1.7;
          background-color: #f8f9fa;
          width: 100%;
          min-height: 100vh;
        }

        /* 1. Hero Section */
        .terms-hero-premium {
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

        .terms-hero-premium::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.2) 0%, rgba(255, 107, 0, 0) 70%);
          top: -100px;
          left: -100px;
          z-index: 1;
        }

        .terms-hero-premium::after {
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
        .terms-content-section {
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
          .terms-hero-premium {
            padding: 60px 15px;
          }
          .legal-card {
            padding: 25px 20px;
          }
        }
      `}</style>

      {/* 1. Hero Section */}
      <div className="terms-hero-premium">
        <div className="hero-premium-content">
          <span className="hero-tag-badge">Legal Agreement</span>
          <h1>Terms & Conditions</h1>
          <p>Please read our terms and conditions carefully before using our footwear store and purchasing services.</p>
          <div className="premium-breadcrumb">Home &nbsp;/&nbsp; <span>Terms & Conditions</span></div>
        </div>
      </div>

      {/* 2. Main Content Section */}
      <div className="terms-content-section">
        {/* Section 1 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">01</span>
            <h2>Acceptance of Terms</h2>
          </div>
          <p>
            Welcome to ShoeStore. By accessing, browsing, or using our online store and purchasing any footwear products through our platform, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. These terms constitute a legally binding agreement between you ("Customer") and ShoeStore Sri Lanka.
          </p>
          <p>
            If you do not agree with any part of these terms, you must refrain from placing orders or using our website services. We reserve the right to modify, amend, or update these Terms and Conditions at any time without prior notice. Continued use of our services following any changes signifies your acceptance of the updated terms.
          </p>
        </div>

        {/* Section 2 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">02</span>
            <h2>Account Registration</h2>
          </div>
          <p>
            To place an order or access certain personalized features on ShoeStore, you may be required to register a customer account. When creating your account, you must provide accurate, current, and complete personal information including your full name, email address, phone number, and physical delivery address in Sri Lanka.
          </p>
          <p>
            You are solely responsible for maintaining the confidentiality of your account login credentials and password. You agree to accept responsibility for all activities and purchases that occur under your account. If you suspect unauthorized access or any security breach involving your account, you must notify our customer support team immediately.
          </p>
        </div>

        {/* Section 3 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">03</span>
            <h2>Products & Pricing</h2>
          </div>
          <p>
            We strive to display our footwear inventory, product descriptions, sizing guides, and colors as accurately as possible. However, actual product colors may slightly vary depending on display settings and monitor calibration. All footwear sizes are specified according to UK/US standard measurements as indicated on product listings.
          </p>
          <p>
            All prices listed on ShoeStore are in Sri Lankan Rupees (LKR) and include applicable local indirect taxes unless explicitly stated otherwise. We reserve the right to correct pricing errors, alter product specifications, or modify prices at any time. In the event a product is listed at an incorrect price due to typographical error, we reserve the right to cancel orders placed for the product.
          </p>
        </div>

        {/* Section 4 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">04</span>
            <h2>Orders & Payments</h2>
          </div>
          <p>
            Placing an order on our platform constitutes an offer to purchase the specified footwear items. Order confirmation is subject to product availability and payment verification. Once an order is submitted, you will receive an automated email receipt confirming the order details.
          </p>
          <p>
            We accept online credit/debit card payments (Visa, Mastercard), direct bank transfers, and Cash on Delivery (COD) for eligible delivery locations within Sri Lanka. For Cash on Delivery orders, full payment in LKR cash must be tendered to the courier representative upon package delivery. Failure to provide complete payment will result in non-delivery.
          </p>
        </div>

        {/* Section 5 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">05</span>
            <h2>Shipping & Delivery</h2>
          </div>
          <p>
            We deliver footwear across all provinces and districts in Sri Lanka through trusted domestic courier partners. Standard delivery typically takes 2 to 4 business days for Western Province (Colombo, Gampaha, Kalutara) and 3 to 6 business days for islandwide outstation locations.
          </p>
          <p>
            Shipping fees are calculated during checkout based on delivery location and order weight. Delivery estimates are indicative and subject to weather conditions, public holidays, or unforeseen logistical delays. Risk of loss and title for ordered items pass to you upon delivery of the package to your specified address.
          </p>
        </div>

        {/* Section 6 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">06</span>
            <h2>Returns & Refund Policy</h2>
          </div>
          <p>
            We take pride in shoe quality and customer satisfaction. If you receive footwear with a manufacturing defect, damage, or incorrect size, you may request an exchange or return within 7 calendar days of receipt, provided the shoes are unworn, in original condition, and packed in original brand packaging with tags attached.
          </p>
          <p>
            Items showing signs of outdoor wear, scuffs, modification, or lack of original tags are ineligible for return or refund. Approved refunds will be processed via bank transfer or credited to the original payment method within 5 to 7 working days after returned items undergo inspection at our warehouse.
          </p>
        </div>

        {/* Section 7 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">07</span>
            <h2>Intellectual Property</h2>
          </div>
          <p>
            All content published on the ShoeStore website, including text, graphics, logos, images, product photos, digital downloads, banners, and software code, is the property of ShoeStore or its content suppliers and is protected by Sri Lankan intellectual property laws.
          </p>
          <p>
            You may not copy, reproduce, distribute, modify, republish, or exploit any portion of our website content or brand assets for commercial purposes without prior express written authorization from ShoeStore management.
          </p>
        </div>

        {/* Section 8 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">08</span>
            <h2>Limitation of Liability</h2>
          </div>
          <p>
            ShoeStore, its directors, employees, or partners shall not be held liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or inability to access our store, any footwear purchases, or unexpected courier delivery delays.
          </p>
          <p>
            To the maximum extent permitted by applicable Sri Lankan law, our total liability for any claims arising from a footwear purchase shall not exceed the total amount paid by you for the specific order giving rise to the claim.
          </p>
        </div>

        {/* Section 9 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">09</span>
            <h2>Privacy</h2>
          </div>
          <p>
            Your privacy and personal data protection are paramount to us. Information collected during checkout or account creation is processed in strict compliance with our Privacy Policy. We do not sell or trade your personal data to unauthorized third parties.
          </p>
          <p>
            By using our website, you consent to the collection, storage, and processing of your details for order fulfillment, delivery logistics, and customer support services as outlined in our detailed Privacy Policy document.
          </p>
        </div>

        {/* Section 10 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">10</span>
            <h2>Governing Law</h2>
          </div>
          <p>
            These Terms and Conditions shall be governed by, construed, and enforced in accordance with the laws of the Democratic Socialist Republic of Sri Lanka, without regard to its conflict of law principles.
          </p>
          <p>
            Any dispute, controversy, or claim arising out of or relating to these terms, including sales transactions, product returns, or service performance, shall be subject to the exclusive jurisdiction of the competent courts of Colombo, Sri Lanka.
          </p>
        </div>

        {/* Section 11 */}
        <div className="legal-card">
          <div className="legal-card-header">
            <span className="section-number">11</span>
            <h2>Contact Information</h2>
          </div>
          <p>
            If you have any questions, inquiries, or clarifications regarding these Terms and Conditions or your footwear orders, please contact our customer support team through the following channels:
          </p>
          <div className="contact-info-box">
            <p><strong>Store Name:</strong> ShoeStore Sri Lanka</p>
            <p><strong>Head Office:</strong> No. 145, Galle Road, Colombo 03, Sri Lanka</p>
            <p><strong>Hotline:</strong> +94 11 234 5678 / +94 77 123 4567</p>
            <p><strong>Email:</strong> support@shoestore.lk / legal@shoestore.lk</p>
            <p><strong>Operating Hours:</strong> Monday – Saturday: 9:00 AM – 6:00 PM (IST)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
