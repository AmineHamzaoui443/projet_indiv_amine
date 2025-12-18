const { validateArticle } = require('../middlewares/validate');

describe('validateArticle middleware', () => {
  it('retourne 400 si erreurs de validation', () => {
    const req = {
      body: {
        title: '', // invalide (required + max)
        description: '', // invalide
        owner: JSON.stringify({ name: 'X', contact: 'Y' }),
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    validateArticle(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it("appelle next et remplit req.validatedArticle si les données sont valides", () => {
    const req = {
      body: {
        title: 'Titre OK',
        description: 'Description OK',
        owner: JSON.stringify({ name: 'Amine', contact: 'test@test.com' }),
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    validateArticle(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(req.validatedArticle).toBeDefined();
    expect(req.validatedArticle.title).toBe('Titre OK');
  });
});
