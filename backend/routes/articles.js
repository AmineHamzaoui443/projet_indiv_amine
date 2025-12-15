const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createArticle, getArticles } = require('../controllers/articleController');
const auth = require('../middlewares/auth'); // <-- ajout

// Multer en mémoire (buffer, pas de fichier sur disque)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Protégé : créer une annonce (user authentifié)
router.post('/', auth, upload.single('image'), createArticle);

// Public : lire toutes les annonces
router.get('/', getArticles);

module.exports = router;
