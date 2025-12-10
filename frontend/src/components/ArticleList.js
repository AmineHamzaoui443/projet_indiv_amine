import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ArticleList() {
  const [articles, setArticles] = useState([]);

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
      <div className="articles-header">
        <h2 className="articles-title">Articles proposés</h2>
        <span className="articles-count">
          {articles.length} article{articles.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="articles-grid">
        {articles.map((article) => (
          <div className="article-card" key={article._id}>
            <div className="article-image-wrapper">
              {article.image ? (
                <img
                  className="article-image"
                  src={`${API_BASE_URL}/${article.image}`}
                  alt={article.title}
                />
              ) : (
                <span className="article-placeholder">Aucune image</span>
              )}
            </div>

            <div className="article-content">
              <h3 className="article-title">{article.title}</h3>
              <p className="article-description">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleList;
