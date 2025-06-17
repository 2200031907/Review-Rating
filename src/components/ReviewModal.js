import React from 'react';
import ModalPortal from './ModalPortal';
import './Model.css';
import ReviewForm from './ReviewForm';

function ReviewModal({ product, onClose }) {
  return (
    <ModalPortal>
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-btn" onClick={onClose}>×</button>
          <h2>{product.name}</h2>
          <ReviewForm productId={product.id} />
        </div>
      </div>
    </ModalPortal>
  );
}

export default ReviewModal;