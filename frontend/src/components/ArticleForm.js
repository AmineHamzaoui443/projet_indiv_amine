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

    try {
      await axios.post('http://localhost:5000/api/articles', formData);
      alert('Article ajouté !');
      setTitle('');
      setDescription('');
      setImage(null);
    } catch (err) {
      console.error(err);
      alert('Erreur lors de l’ajout de l’article');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Proposer l’article</button>
    </form>
  );
}

export default ArticleForm;
