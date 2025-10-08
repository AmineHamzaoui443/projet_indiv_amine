const Article = require('../models/article');

// Créer un nouvel article
exports.createArticle = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : null;

    const article = new Article({ title, description, image });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l’article', error });
  }
};

// Récupérer tous les articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des articles', error });
  }
};
