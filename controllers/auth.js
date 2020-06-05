const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const database = require('../models/index');
const User = database.users;

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    const accessToken = generateAccessToken(user.id);

    return res.status(200).json({ accessToken });
  }
  
  return res.status(400).send('Invalid username or password.');
};

// Register
exports.register = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser.id);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Authenticate token middleware
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403);
    req.userId = payload.userId;
    next();
  });
};

function generateAccessToken(userId) {
  // expires after half an hour (1800 seconds = 30 minutes)
  return jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: 1800 });
}
