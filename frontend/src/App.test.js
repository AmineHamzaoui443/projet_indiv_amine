import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test("affiche le titre 'Mon site d'annonces'", () => {
  render(<App />);

  const title = screen.getByText(/mon site d'annonces/i);

  expect(title).toBeInTheDocument();
});
