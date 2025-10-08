const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createArticle, getArticles } = require('../controllers/articleController');

// Configurer multer pour l’upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post('/', upload.single('image'), createArticle);
router.get('/', getArticles);

module.exports = router;
