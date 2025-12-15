import React from 'react';

function ArticleList({ articles, currentUser, onDelete }) {
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
                  src={article.image}
                  alt={article.title}
                />
              ) : (
                <span className="article-placeholder">Aucune image</span>
              )}
            </div>

            <div className="article-content">
              <h3 className="article-title">{article.title}</h3>
              <p className="article-description">{article.description}</p>

              {currentUser && article.owner === currentUser.id && (
                <button
                  type="button"
                  className="article-delete-button"
                  onClick={() => onDelete && onDelete(article._id)}
                >
                  Supprimer
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleList;
