const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createArticle, getArticles } = require('../controllers/articleController');

// Multer en mémoire (buffer, pas de fichier sur disque)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), createArticle);
router.get('/', getArticles);

module.exports = router;
