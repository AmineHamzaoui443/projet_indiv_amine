// Patch pour le bug "crypto is not defined" du SDK Azure en Node
const nodeCrypto = require('crypto');
global.crypto = nodeCrypto;

const Article = require('../models/article');
const { BlobServiceClient } = require('@azure/storage-blob');
const { DefaultAzureCredential } = require('@azure/identity');

const AZURE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME;
const STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;

// Création du client Blob en utilisant l'identité managée de la VM
const credential = new DefaultAzureCredential();
const blobServiceClient = new BlobServiceClient(
  `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  credential
);

// Upload d'un fichier vers Azure Blob et retour de l'URL
async function uploadToAzure(file) {
  if (!file) return null;

  const containerClient = blobServiceClient.getContainerClient(
    AZURE_CONTAINER_NAME
  );

  const timestamp = Date.now();
  const sanitizedOriginalName = file.originalname.replace(/\s+/g, '-');
  const blobName = `${timestamp}-${sanitizedOriginalName}`;

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: { blobContentType: file.mimetype }
  });

  return blockBlobClient.url;
}

// Créer un nouvel article (user authentifié)
exports.createArticle = async (req, res) => {
  try {
    const { title, description } = req.body;

    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadToAzure(req.file);
    }

    const article = new Article({
      title,
      description,
      image: imageUrl,
      owner: req.user.userId, // <-- liaison avec le user du token
    });

    await article.save();
    res.status(201).json(article);
  } catch (error) {
    console.error('Erreur createArticle:', error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l’article", error });
  }
};

// Récupérer tous les articles (public)
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    console.error('Erreur getArticles:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération des articles',
      error
    });
  }
};

// Récupérer les articles du user connecté
exports.getMyArticles = async (req, res) => {
  try {
    const articles = await Article.find({ owner: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    console.error('Erreur getMyArticles:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération des articles utilisateur',
      error
    });
  }
};

// Mettre à jour un article du user connecté
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    if (article.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Action non autorisée' });
    }

    const { title, description } = req.body;
    if (title !== undefined) article.title = title;
    if (description !== undefined) article.description = description;

    await article.save();
    res.json(article);
  } catch (error) {
    console.error('Erreur updateArticle:', error);
    res.status(500).json({
      message: 'Erreur lors de la mise à jour de l’article',
      error
    });
  }
};

// Supprimer un article du user connecté
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    if (article.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Action non autorisée' });
    }

    await article.deleteOne();
    res.json({ message: 'Article supprimé' });
  } catch (error) {
    console.error('Erreur deleteArticle:', error);
    res.status(500).json({
      message: 'Erreur lors de la suppression de l’article',
      error
    });
  }
};
