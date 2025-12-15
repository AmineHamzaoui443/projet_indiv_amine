import React, { useState } from 'react';

const API_URL = '/api';

function ArticleForm({ token, onArticleCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await fetch(`${API_URL}/articles`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (!res.ok) {
        alert('Tu dois être connecté pour poster une annonce');
        return;
      }

      const article = await res.json();
      if (onArticleCreated) onArticleCreated(article);
      setTitle('');
      setContent('');
      setImage(null);
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la création');
    }
  }

  return (
    <form className="card article-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Nouvelle annonce</h2>
      <p className="form-caption">
        Ajoute un titre, une description et une image pour ta nouvelle annonce.
      </p>

      <div className="form-group">
        <label htmlFor="article-title">Titre</label>
        <input
          id="article-title"
          type="text"
          placeholder="Ex : Appartement 2 pièces à louer"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="article-content">Contenu</label>
        <textarea
          id="article-content"
          placeholder="Décris ton annonce, le prix, la localisation..."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="article-image">Image (optionnel)</label>
        <input
          id="article-image"
          type="file"
          onChange={e => setImage(e.target.files[0])}
        />
      </div>

      <button type="submit">Publier l&apos;annonce</button>
    </form>
  );
}

export default ArticleForm;
