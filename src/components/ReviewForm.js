import { useState } from 'react';
import axios from 'axios';
import './ReviewForm.css'; 
function ReviewForm({ productId }) {
  const [form, setForm] = useState({
    email: '',
    rating: '',
    review: '',
    photo: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || (!form.rating && !form.review)) {
      alert('Please fill required fields');
      return;
    }

    const formData = new FormData();
    formData.append('email', form.email);
    formData.append('productId', productId);
    formData.append('rating', form.rating);
    formData.append('review', form.review);
    if (form.photo) formData.append('photo', form.photo);

    try {
      const res = await axios.post('http://localhost:5000/review', formData);
      alert(res.data);
    } catch (err) {
      alert(err.response?.data || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <input
        type="email"
        placeholder="Your Email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border p-1"
      />
      <input
        type="number"
        min="1"
        max="5"
        placeholder="Rating (1-5)"
        value={form.rating}
        onChange={(e) => setForm({ ...form, rating: e.target.value })}
        className="border p-1"
      />
      <textarea
        placeholder="Your review (optional)"
        value={form.review}
        onChange={(e) => setForm({ ...form, review: e.target.value })}
        className="border p-1"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, photo: e.target.files[0] })}
        className="border"
      />
      <button className="bg-blue-600 text-white px-2 py-1 rounded" type="submit">
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;
