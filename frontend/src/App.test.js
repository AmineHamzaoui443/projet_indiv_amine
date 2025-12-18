import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test("affiche le titre 'la petite maison épouvante'", () => {
  render(<App />);

  const title = screen.getByText(/la petite maison épouvante/i);

  expect(title).toBeInTheDocument();
});
