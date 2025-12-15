const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  createArticle,
  getArticles,
  getMyArticles,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');
const auth = require('../middlewares/auth');

// Multer en mémoire (buffer, pas de fichier sur disque)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Protégé : créer une annonce (user authentifié)
router.post('/', auth, upload.single('image'), createArticle);

// Public : lire toutes les annonces
router.get('/', getArticles);

// Protégé : lire les annonces du user connecté
router.get('/me', auth, getMyArticles);

// Protégé : mettre à jour une annonce (seulement son owner)
router.put('/:id', auth, updateArticle);

// Protégé : supprimer une annonce (seulement son owner)
router.delete('/:id', auth, deleteArticle);

module.exports = router;
