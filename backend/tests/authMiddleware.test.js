const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

process.env.JWT_SECRET = 'testsecret';

describe('auth middleware', () => {
  const next = jest.fn();
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  it('retourne 401 si pas de header Authorization', () => {
    const req = { headers: {} };

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('accepte un token valide et appelle next', () => {
    const payload = { userId: '123', email: 'test@example.com' };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    const req = {
      headers: { authorization: `Bearer ${token}` },
    };

    res.status.mockClear();
    res.json.mockClear();
    next.mockClear();

    auth(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user.userId).toBe('123');
  });
});
