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
    <form onSubmit={handleSubmit}>
      <h2>Nouvelle annonce</h2>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Contenu"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={e => setImage(e.target.files[0])}
      />
      <button type="submit">Publier</button>
    </form>
  );
}

export default ArticleForm;
