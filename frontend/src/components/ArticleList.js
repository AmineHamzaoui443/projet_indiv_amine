import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ArticleList() {
  const [articles, setArticles] = useState([]);

  // ✅ Définir la base URL dynamique
  const API_BASE_URL = window.location.origin;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/articles`);
        setArticles(res.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des articles :', err);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div>
      <h2>Articles proposés</h2>
      {articles.map(article => (
        <div key={article._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          {article.image && (
            // ✅ Image servi depuis le même host que le frontend
            <img src={`${API_BASE_URL}/${article.image}`} alt={article.title} width="200" />
          )}
        </div>
      ))}
    </div>
  );
}

export default ArticleList;
