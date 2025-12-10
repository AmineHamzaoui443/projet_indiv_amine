import React from 'react';
import ArticleForm from './components/ArticleForm';
import ArticleList from './components/ArticleList';
import './index.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div>
          <h1 className="app-title">Petite Maison Épouvante</h1>
          <p className="app-subtitle">
            Échange d’objets maudits entre voisins consentants.
          </p>
        </div>
        <span className="app-subtitle">Version bêta</span>
      </header>

      <main className="app-main">
        <section className="card">
          <h2 className="form-title">Proposer un nouvel article</h2>
          <p className="form-caption">
            Décrivez brièvement l’objet et, si possible, ajoutez une image pour inspirer la terreur.
          </p>
          <ArticleForm />
        </section>

        <section className="card">
          <ArticleList />
        </section>
      </main>
    </div>
  );
}

export default App;
