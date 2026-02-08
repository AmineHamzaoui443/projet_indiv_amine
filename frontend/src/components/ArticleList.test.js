import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ArticleList from './ArticleList';

test("affiche le bon compteur d'articles (singulier)", () => {
  render(<ArticleList articles={[{ _id: '1', title: 'A1', description: 'D1' }]} />);
  expect(screen.getByText("1 article")).toBeInTheDocument();
});

test("affiche le bon compteur d'articles (pluriel)", () => {
  render(
    <ArticleList
      articles={[
        { _id: '1', title: 'A1', description: 'D1' },
        { _id: '2', title: 'A2', description: 'D2' },
      ]}
    />
  );
  expect(screen.getByText("2 articles")).toBeInTheDocument();
});

test("affiche 'Aucune image' si image absente", () => {
  render(
    <ArticleList
      articles={[{ _id: '1', title: 'A1', description: 'D1', image: null }]}
    />
  );
  expect(screen.getByText(/aucune image/i)).toBeInTheDocument();
});

test('affiche une image si image présente', () => {
  render(
    <ArticleList
      articles={[
        {
          _id: '1',
          title: 'A1',
          description: 'D1',
          image: 'https://example.com/img.png',
        },
      ]}
    />
  );

  const img = screen.getByRole('img', { name: 'A1' });
  expect(img).toHaveAttribute('src', 'https://example.com/img.png');
});

test("affiche le bouton Supprimer seulement si l'utilisateur est owner, et déclenche onDelete", async () => {
  const user = userEvent.setup();
  const onDelete = jest.fn();

  render(
    <ArticleList
      currentUser={{ id: 'user-1' }}
      onDelete={onDelete}
      articles={[
        { _id: '1', title: 'A1', description: 'D1', owner: 'user-1' },
        { _id: '2', title: 'A2', description: 'D2', owner: 'other' },
      ]}
    />
  );

  // Un seul bouton "Supprimer" (pour l'article owner)
  const btn = screen.getByRole('button', { name: /supprimer/i });
  await user.click(btn);

  expect(onDelete).toHaveBeenCalledTimes(1);
  expect(onDelete).toHaveBeenCalledWith('1');
});
