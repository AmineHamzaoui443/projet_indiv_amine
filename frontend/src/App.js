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

    // Recharger toutes les annonces publiques après déconnexion
    fetch(`${API_URL}/articles`)
      .then(res => res.json())
      .then(setArticles)
      .catch(console.error);
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
    <div className="App page">
      <header className="app-header hero">
        <div>
          <h1 className="app-title spooky-title">La petite maison épouvante</h1>
          <p className="app-subtitle tagline">
            Là où chaque annonce laisse une trace que la nuit n’efface jamais.
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

      <section className="hero-media">
        <div className="hero-badge">Entrez… si vous l’osez</div>
        <div className="hero-icons">
          <span className="hero-icon">🕯️</span>
          <span className="hero-icon">🕷️</span>
          <span className="hero-icon">🏚️</span>
        </div>
      </section>

      <main className="app-main content">
        <section>
          {!user && (
            <div className="card">
              <h2 className="form-title">Rejoindre la maison</h2>
              <p className="form-caption">
                Crée un compte pour publier tes annonces… et ne plus jamais les oublier.
              </p>
              <form className="auth-form" onSubmit={handleRegister}>
                <input name="name" type="text" placeholder="Nom" required />
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
                Déjà dans la maison ?
              </h2>
              <p className="form-caption">
                Connecte-toi pour retrouver tes annonces les plus inquiétantes.
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
