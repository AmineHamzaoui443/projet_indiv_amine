const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // <-- ajout
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', articleSchema);
