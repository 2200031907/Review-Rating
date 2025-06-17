const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.get('/products', reviewController.getProducts);
router.post('/review', upload.single('photo'), reviewController.submitReview);
router.get('/reviews/:productId', reviewController.getProductReviews);

router.post('/product', upload.single('image'), reviewController.addProduct);

module.exports = router;
