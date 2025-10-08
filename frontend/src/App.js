import React from 'react';
import ArticleForm from './components/ArticleForm';
import ArticleList from './components/ArticleList';

function App() {
  return (
    <div className="App">
      <h1>Proposer un article à échanger</h1>
      <ArticleForm />
      <ArticleList />
    </div>
  );
}

export default App;
