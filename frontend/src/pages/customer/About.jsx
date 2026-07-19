import React from 'react';
import shoeHeroBg from '../../assets/shoes.png'; // Hero Section Background
import aboutShoeImg from '../../assets/shoe_logo.jpeg'; // Main Image 
import deliveryMapImg from '../../assets/Islandwide_delivery.jpg'; // Delivery Map Image 

const About = () => {
  return (
    <div className="about-container">
      {/* --- Internal CSS Style Tag --- */}
      <style>{`
        .about-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          line-height: 1.6;
          background-color: #fff;
          width: 100%;
        }

        /* 1. Premium Editorial Hero Section */
        .about-hero-premium {
          position: relative;
          width: 100%;
          height: 450px;
          background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
                            var(--hero-bg);
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }

        .hero-premium-content {
          max-width: 800px;
          padding: 0 20px;
        }

        .hero-premium-content h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin: 0 0 10px 0;
          letter-spacing: -1px;
          text-transform: uppercase;
        }

        .hero-premium-content p {
          font-size: 1.3rem;
          font-weight: 400;
          margin: 0 0 20px 0;
          letter-spacing: 1px;
          opacity: 0.95;
        }

        .premium-breadcrumb {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          opacity: 0.7;
        }

        /* 2. Original Clean Layout Styles */
        .about-section {
          max-width: 1100px;
          margin: 80px auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          gap: 50px;
          flex-wrap: wrap;
        }

        .about-section.reverse {
          flex-direction: row-reverse;
        }

        .section-content {
          flex: 1;
          min-width: 300px;
        }

        .section-image-area {
          flex: 1;
          min-width: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .sub-title {
          color: #888;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 5px;
          font-weight: 600;
          display: block;
        }

        .main-title {
          font-size: 2rem;
          color: #111;
          margin: 0 0 15px 0;
          text-transform: uppercase;
          font-weight: 700;
        }

        .description-para {
          color: #555;
          margin-bottom: 20px;
          font-size: 1.05rem;
          text-align: justify;
        }

        /* Responsive Display Images Style */
        .about-display-image {
          width: 100%;
          max-width: 400px;
          height: auto;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .about-display-image:hover {
          transform: translateY(-5px);
        }

        /* Responsive Layout Grid */
        @media (max-width: 768px) {
          .hero-premium-content h1 {
            font-size: 2.5rem;
          }
          .hero-premium-content p {
            font-size: 1.1rem;
          }
          .about-section {
            margin: 40px auto;
            gap: 30px;
          }
          .about-display-image {
            max-width: 100%;
          }
        }
      `}</style>

      {/* 1. Premium Editorial Hero Section */}
      <div className="about-hero-premium" style={{ '--hero-bg': `url(${shoeHeroBg})` }}>
        <div className="hero-premium-content">
          <h1>Urban Sole</h1>
          <p>Discover Comfort and Style With Our Premium Shoe Collection.</p>
          <div className="premium-breadcrumb">Home / About Us</div>
        </div>
      </div>

      {/* 2. Main Brand Introduction Section */}
      <div className="about-section">
        <div className="section-image-area">
          <img 
            src={aboutShoeImg} 
            alt="About Shoe Store" 
            className="about-display-image" 
          />
        </div>
        
        <div className="section-content">
          <span className="sub-title">ABOUT US</span>
          <h2 className="main-title">GET TO KNOW ABOUT SHOESTORE</h2>
          <p className="description-para">
            Welcome to ShoeStore, your ultimate destination for stylish and comfortable footwear in Sri Lanka. 
            Founded with a simple yet ambitious mission: to bring quality footwear designs and the latest trends 
            directly to shoe enthusiasts across the island.
          </p>
          <p className="description-para">
            We believe that wearing the right pair of shoes is all about embracing a lifestyle that embodies daily comfort, 
            durability, and personal style. From casual everyday walks to elegant trendsetting looks, we strive to cater to 
            the diverse footwear tastes of everyone.
          </p>
        </div>
      </div>

      {/* 3. Vision & Mission Section */}
      <div className="about-section reverse">
        <div className="section-image-area">
          <img 
            src={deliveryMapImg} 
            alt="Islandwide Shoe Delivery" 
            className="about-display-image" 
          />
        </div>

        <div className="section-content">
          <span className="sub-title">Our Vision & Mission</span>
          <h2 className="main-title">ShoeStore Vision and Mission</h2>
          <p className="description-para">
            Beyond offering quality products, ShoeStore is driven by a passion for creating an inclusive footwear community. 
            We believe in fostering a culture where everyone can find their perfect fit, feel confident, and express their individual style through high-quality choices.
          </p>
          <p className="description-para">
            Thank you for choosing ShoeStore as your trusted source for fashion-forward footwear. Join us on this journey as we continue 
            to redefine the way you shop for shoes in Sri Lanka, one perfect pair at a time.
          </p>
        </div>
      </div>

    </div>
  );
};

export default About;