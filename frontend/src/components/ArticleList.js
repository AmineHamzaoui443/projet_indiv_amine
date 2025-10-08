import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await axios.get('http://localhost:5000/api/articles');
      setArticles(res.data);
    };
    fetchArticles();
  }, []);

  return (
    <div>
      <h2>Articles proposés</h2>
      {articles.map(article => (
        <div key={article._id} style={{border: '1px solid #ccc', padding: '10px', margin: '10px 0'}}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          {article.image && <img src={`http://localhost:5000/${article.image}`} alt={article.title} width="200" />}
        </div>
      ))}
    </div>
  );
}

export default ArticleList;
