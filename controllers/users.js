const database = require('../models/index');
const User = database.users;

exports.getAll = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};