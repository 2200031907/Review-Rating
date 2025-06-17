import { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import './ReviewForm.css';
import './Model.css';
import axios from 'axios';

function ProductCard({ product }) {
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/reviews/${product.id}`)
      .then(res => setReviews(res.data));
  }, [product.id]);

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Avg Rating: {parseFloat(product.avg_rating || 0).toFixed(1)} ⭐</p>

      {product.image && (
        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.name}
          className="product-image"
        />
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        <button className="review-btn" onClick={() => setShowFormModal(true)}>Write a Review</button>
        <button className="review-btn" onClick={() => setShowReviewModal(true)}>View Reviews</button>
      </div>

  
      {showFormModal && (
        <div className="modal-overlay" onClick={() => setShowFormModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowFormModal(false)}>×</button>
            <h3>Write a Review for {product.name}</h3>
            <ReviewForm productId={product.id} />
          </div>
        </div>
      )}

     
      {showReviewModal && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowReviewModal(false)}>×</button>
            <h3>Reviews for {product.name}</h3>
            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              reviews.map((rev, idx) => (
                <div key={idx} className="review-item">
                  <p><strong>{rev.email}</strong> ⭐ {rev.rating}</p>
                  {rev.review && <p>{rev.review}</p>}
                  {rev.photo_url && (
                    <img
                      src={`http://localhost:5000/uploads/${rev.photo_url}`}
                      alt="review"
                      style={{ width: '80px', height: '80px', objectFit: 'cover', marginTop: '5px', borderRadius: '8px' }}
                    />
                  )}
                  <p className="review-meta">
                    {new Date(rev.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
