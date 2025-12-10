import React, { useState } from 'react';
import axios from 'axios';

function ArticleForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) formData.append('image', image);

    const API_URL = `${window.location.origin}/api/articles`;

    try {
      await axios.post(API_URL, formData);
      alert('Article ajouté !');
      setTitle('');
      setDescription('');
      setImage(null);
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de l’ajout de l’article');
    }
  };

  return (
    <form className="article-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Titre de l’objet</label>
        <input
          id="title"
          type="text"
          placeholder="Ex. Livre qui chuchote la nuit"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Décrivez l’histoire, l’apparence ou les effets étranges de l’objet…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image (optionnel)</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <button type="submit">
        Proposer l’article
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

export default ArticleForm;
