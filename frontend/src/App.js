import React, { useState, useEffect } from 'react';
import ArticleForm from './components/ArticleForm';
import ArticleList from './components/ArticleList';

// En prod : même origine que le backend
const API_URL = '/api';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [articles, setArticles] = useState([]);

  // Charger les articles au démarrage (GET public)
  useEffect(() => {
    fetch(`${API_URL}/articles`)
      .then(res => res.json())
      .then(setArticles)
      .catch(console.error);
  }, []);

  async function handleRegister(e) {
    e.preventDefault();
    const { name, email, password } = e.target;

    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    });

    if (!res.ok) {
      alert("Erreur lors de l'inscription");
      return;
    }

    const data = await res.json();
    setUser(data.user);
    setToken(data.token);
  }

  async function handleLogin(e) {
    e.preventDefault();
    const { email, password } = e.target;

    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!res.ok) {
      alert('Email ou mot de passe incorrect');
      return;
    }

    const data = await res.json();
    setUser(data.user);
    setToken(data.token);
  }

  function handleLogout() {
    setUser(null);
    setToken(null);
  }

  async function loadMyArticles() {
    if (!token) return;
    try {
      const res = await fetch('/api/articles/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteArticle(id) {
    if (!token) return;
    if (!window.confirm('Supprimer cette annonce ?')) return;

    const res = await fetch(`/api/articles/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return;
    setArticles(prev => prev.filter(a => a._id !== id));
  }

  return (
    <div className="App">
      <header className="app-header">
        <div>
          <h1 className="app-title">Mon site d&apos;annonces</h1>
          <p className="app-subtitle">
            Publie et gère facilement tes annonces.
          </p>
        </div>

        {user && (
          <div className="user-info">
            <span className="user-text">
              Connecté en tant que {user.name} ({user.email})
            </span>
            <button className="secondary-button" onClick={handleLogout}>
              Se déconnecter
            </button>
            <button className="secondary-button" onClick={loadMyArticles}>
              Mes annonces
            </button>
          </div>
        )}
      </header>

      <main className="app-main">
        <section>
          {!user && (
            <div className="card">
              <h2 className="form-title">Inscription</h2>
              <p className="form-caption">
                Crée un compte pour pouvoir publier tes annonces.
              </p>
              <form className="auth-form" onSubmit={handleRegister}>
                <input name="name" placeholder="Nom" required />
                <input name="email" type="email" placeholder="Email" required />
                <input
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                  required
                />
                <button type="submit">S&apos;inscrire</button>
              </form>

              <h2 className="form-title" style={{ marginTop: '18px' }}>
                Connexion
              </h2>
              <p className="form-caption">
                Déjà un compte ? Connecte-toi pour gérer tes annonces.
              </p>
              <form className="auth-form" onSubmit={handleLogin}>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                  required
                />
                <button type="submit">Se connecter</button>
              </form>
            </div>
          )}

          {user && (
            <ArticleForm
              token={token}
              onArticleCreated={article =>
                setArticles(prev => [article, ...prev])
              }
            />
          )}
        </section>

        <section>
          <div className="card">
            <ArticleList
              articles={articles}
              currentUser={user}
              onDelete={handleDeleteArticle}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
