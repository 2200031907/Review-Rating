// src/pages/ProductsPage.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import ReviewModal from '../components/ReviewModal';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => setProducts(res.data));
  }, []);

  return (
    <>
      <div className="product-container">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onReviewClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ReviewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}

export default ProductsPage;
