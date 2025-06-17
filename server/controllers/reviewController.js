const db = require('../models/db');


exports.getProducts = (req, res) => {
  const query = `
    SELECT p.*, AVG(r.rating) as avg_rating 
    FROM products p
    LEFT JOIN reviews r ON p.id = r.product_id
    GROUP BY p.id
  `;
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};


exports.submitReview = (req, res) => {
  const { email, productId, rating, review } = req.body;
  const photo = req.file ? req.file.filename : null;

  db.query('SELECT id FROM users WHERE email = ?', [email], (err, users) => {
    if (err) return res.status(500).send(err);
    let userId;

    if (users.length > 0) {
      userId = users[0].id;
      insertReview();
    } else {
      db.query('INSERT INTO users (email) VALUES (?)', [email], (err, result) => {
        if (err) return res.status(500).send(err);
        userId = result.insertId;
        insertReview();
      });
    }

    function insertReview() {
      const sql = `INSERT INTO reviews (user_id, product_id, rating, review, photo_url) 
                   VALUES (?, ?, ?, ?, ?)`;
      db.query(sql, [userId, productId, rating || null, review || null, photo], (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') return res.status(400).send('Already reviewed');
          return res.status(500).send(err);
        }
        res.send('Review submitted');
      });
    }
  });
};

exports.getProductReviews = (req, res) => {
  const productId = req.params.productId;

  const sql = `
    SELECT u.email, r.rating, r.review, r.photo_url, r.created_at 
    FROM reviews r 
    JOIN users u ON r.user_id = u.id 
    WHERE r.product_id = ? 
    ORDER BY r.created_at DESC
  `;

  db.query(sql, [productId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

exports.addProduct = (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO products (name, description, image) VALUES (?, ?, ?)';
  db.query(sql, [name, description, image], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Product added successfully');
  });
};
