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

// Créer un nouvel article
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
      image: imageUrl
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

// Récupérer tous les articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    console.error('Erreur getArticles:', error);
    res
      .status(500)
      .json({
        message: 'Erreur lors de la récupération des articles',
        error
      });
  }
};
