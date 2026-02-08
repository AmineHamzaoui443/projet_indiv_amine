import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

beforeEach(() => {
  // Mock fetch pour le GET /api/articles au montage
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test("affiche le titre 'La petite maison épouvante'", () => {
  render(<App />);
  expect(screen.getByText(/la petite maison épouvante/i)).toBeInTheDocument();
});

test("affiche les formulaires d'inscription et connexion quand non connecté", () => {
  render(<App />);

  expect(screen.getByText(/Rejoindre la maison/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /s'inscrire/i })).toBeInTheDocument();

  expect(screen.getByText(/Déjà dans la maison/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument();
});

test('appelle GET /api/articles au montage', async () => {
  render(<App />);
  expect(global.fetch).toHaveBeenCalledWith('/api/articles');
});
