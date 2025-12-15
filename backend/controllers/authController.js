const jwt = require('jsonwebtoken');
const User = require('../models/user');

function createToken(user) {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// REGISTER
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, nom et mot de passe requis' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const user = new User({ email, password, name });
    await user.save();

    const token = createToken(user);
    res.status(201).json({
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (err) {
    console.error('Erreur register:', err);
    res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(400)
        .json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = createToken(user);
    res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (err) {
    console.error('Erreur login:', err);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};

module.exports = {
  register,
  login,
};
