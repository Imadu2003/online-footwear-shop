import React, { useState } from 'react';
import shoeHeroBg from '../../assets/shoes.png'; // Hero Background Image

const Review = () => {
  // Pre-populated initial reviews
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Nalinda Rajapaksha',
      rating: 5,
      date: '2026-07-10',
      comment: 'Absolutely love my new running shoes! The cushioning is fantastic and they fit perfectly. Delivery to Kandy was super fast (just 2 days). Highly recommend ShoeStore!',
      verified: true
    },
    {
      id: 2,
      name: 'Dilani Perera',
      rating: 5,
      date: '2026-07-08',
      comment: 'Extremely comfortable for daily wear. The build quality feels very premium. Best footwear purchase I have made online in Sri Lanka. Will definitely buy again.',
      verified: true
    },
    {
      id: 3,
      name: 'Sahan Gunawardena',
      rating: 4,
      date: '2026-07-05',
      comment: 'Very good designs. The customer support team was very helpful in helping me select the correct size. The shoes look exactly like the pictures.',
      verified: true
    },
    {
      id: 4,
      name: 'Fathima Riza',
      rating: 4,
      date: '2026-06-28',
      comment: 'Good value for money. Very comfortable and stylish. Islandwide delivery option is very convenient.',
      verified: false
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Calculate rating stats dynamically
  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1);

  const starDistribution = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => r.rating === stars).length;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { stars, percentage, count };
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;

    const newReview = {
      id: Date.now(),
      name: formData.name,
      rating: formData.rating,
      date: new Date().toISOString().split('T')[0],
      comment: formData.comment,
      verified: true
    };

    setReviews([newReview, ...reviews]);
    setFormData({ name: '', rating: 5, comment: '' });
    setShowForm(false);
    setSuccessMessage('Thank you! Your review has been successfully posted.');
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <div className="reviews-container">
      {/* --- Internal CSS Style Tag --- */}
      <style>{`
        .reviews-container {
          font-family: 'Outfit', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          line-height: 1.6;
          background-color: #f8f9fa;
          width: 100%;
        }

        /* 1. Hero Section */
        .reviews-hero-premium {
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

        .reviews-hero-premium::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.2) 0%, rgba(255, 107, 0, 0) 70%);
          top: -100px;
          left: -100px;
          z-index: 1;
        }

        .reviews-hero-premium::after {
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

        /* 2. Core Layout Section */
        .reviews-content-section {
          max-width: 1100px;
          margin: 60px auto;
          padding: 0 20px;
        }

        /* 3. Review Summary Panel */
        .summary-panel {
          background: #fff;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          display: grid;
          grid-template-columns: 1fr 1.5fr 1fr;
          align-items: center;
          gap: 40px;
          margin-bottom: 50px;
        }

        @media (max-width: 850px) {
          .summary-panel {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 30px 20px;
            gap: 30px;
          }
        }

        .rating-average-box {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .rating-average-num {
          font-size: 4.5rem;
          font-weight: 800;
          color: #111;
          line-height: 1;
        }

        .stars-container {
          color: #ff9900;
          font-size: 1.5rem;
          margin: 10px 0;
        }

        .total-reviews-count {
          color: #777;
          font-size: 0.95rem;
        }

        /* Distribution Bars */
        .rating-bars {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .rating-bar-row {
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 0.95rem;
        }

        .bar-label {
          width: 60px;
          text-align: right;
          font-weight: 600;
          color: #555;
        }

        .bar-outer {
          flex: 1;
          height: 10px;
          background: #f1f5f9;
          border-radius: 5px;
          overflow: hidden;
        }

        .bar-inner {
          height: 100%;
          background: #ff6b00;
          border-radius: 5px;
        }

        .bar-percentage {
          width: 45px;
          color: #777;
          text-align: left;
        }

        /* Action Box */
        .rating-action-box {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .btn-write-review {
          background-color: var(--color-primary-orange, #ff6b00);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 30px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s;
          box-shadow: 0 5px 15px rgba(255, 107, 0, 0.3);
        }

        .btn-write-review:hover {
          background-color: var(--color-primary-orange-hover, #e56000);
        }

        .btn-write-review:active {
          transform: scale(0.98);
        }

        /* 4. Write Review Form Panel */
        .review-form-panel {
          background: #fff;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.05);
          margin-bottom: 40px;
          border: 1px solid #e2e8f0;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .review-form-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111;
          margin-bottom: 25px;
          text-transform: uppercase;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }

        .interactive-stars {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 5px;
        }

        .interactive-star {
          font-size: 2.2rem;
          cursor: pointer;
          color: #cbd5e1;
          transition: color 0.15s;
        }

        .interactive-star.filled {
          color: #ff9900;
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
          background-color: #fafafa;
          transition: border-color 0.2s;
          color: #333 !important;
        }

        .form-input:focus, .form-textarea:focus {
          border-color: #ff6b00;
          background-color: #fff;
          color: #333 !important;
        }

        .form-textarea {
          height: 120px;
          resize: vertical;
        }

        .form-actions {
          display: flex;
          gap: 15px;
          justify-content: flex-end;
        }

        .btn-cancel {
          background: #f1f5f9;
          color: #475569;
          border: none;
          padding: 12px 25px;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-cancel:hover {
          background: #e2e8f0;
        }

        /* Success Alert */
        .alert-success {
          background-color: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 30px;
          text-align: center;
          font-weight: 600;
        }

        /* 5. Reviews Feed */
        .reviews-feed-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #111;
          margin-bottom: 30px;
          text-align: left;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 10px;
        }

        .reviews-feed {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .review-card {
          background: #fff;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.02);
          text-align: left;
          transition: transform 0.2s ease;
          border: 1px solid #f1f5f9;
        }

        .review-card:hover {
          transform: translateY(-2px);
        }

        .review-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 15px;
        }

        .reviewer-info {
          display: flex;
          flex-direction: column;
        }

        .reviewer-name {
          font-weight: 700;
          font-size: 1.1rem;
          color: #111;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .badge-verified {
          background-color: #d1fae5;
          color: #065f46;
          font-size: 0.75rem;
          padding: 3px 8px;
          border-radius: 20px;
          font-weight: 600;
        }

        .review-date {
          color: #94a3b8;
          font-size: 0.85rem;
          margin-top: 2px;
        }

        .review-rating-stars {
          color: #ff9900;
          font-size: 1.2rem;
        }

        .review-comment {
          color: #4b5563;
          font-size: 1.05rem;
          line-height: 1.6;
        }
      `}</style>

      {/* 1. Hero Section */}
      <div className="reviews-hero-premium">
        <div className="hero-premium-content">
          <span className="hero-tag-badge">Customer Voices</span>
          <h1>Customer Reviews</h1>
          <p>What Our Happy Customers Say About Their ShoeStore Experience.</p>
          <div className="premium-breadcrumb">Home &nbsp;/&nbsp; <span>Reviews</span></div>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="reviews-content-section">
        
        {/* Success Alert */}
        {successMessage && <div className="alert-success">{successMessage}</div>}

        {/* 3. Summary Panel */}
        <div className="summary-panel">
          <div className="rating-average-box">
            <span className="rating-average-num">{averageRating}</span>
            <div className="stars-container">
              {'★'.repeat(Math.round(parseFloat(averageRating)))}{'☆'.repeat(5 - Math.round(parseFloat(averageRating)))}
            </div>
            <span className="total-reviews-count">Based on {totalReviews} Reviews</span>
          </div>

          <div className="rating-bars">
            {starDistribution.map(item => (
              <div className="rating-bar-row" key={item.stars}>
                <span className="bar-label">{item.stars} Stars</span>
                <div className="bar-outer">
                  <div className="bar-inner" style={{ width: `${item.percentage}%` }}></div>
                </div>
                <span className="bar-percentage">{item.percentage}%</span>
              </div>
            ))}
          </div>

          <div className="rating-action-box">
            {!showForm && (
              <button className="btn-write-review" onClick={() => setShowForm(true)}>
                Write A Review
              </button>
            )}
          </div>
        </div>

        {/* 4. Write Review Form */}
        {showForm && (
          <div className="review-form-panel">
            <h3 className="review-form-title">Share Your Experience</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Overall Rating</label>
                  <div className="interactive-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`interactive-star ${
                          star <= (hoverRating || formData.rating) ? 'filled' : ''
                        }`}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Review Details</label>
                <textarea 
                  placeholder="What did you like or dislike? How was the fitting and comfort?" 
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="form-textarea" 
                  required
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-write-review" style={{ borderRadius: '30px' }}>
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 5. Reviews List */}
        <h2 className="reviews-feed-title">Latest Customer Feedback ({totalReviews})</h2>
        <div className="reviews-feed">
          {reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-card-header">
                <div className="reviewer-info">
                  <span className="reviewer-name">
                    {review.name}
                    {review.verified && <span className="badge-verified">✓ Verified Buyer</span>}
                  </span>
                  <span className="review-date">Posted on {review.date}</span>
                </div>
                <div className="review-rating-stars">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Review;
