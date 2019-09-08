const jwt = require('jsonwebtoken');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).populate('expenses');
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    });
  }
  const userForToken = {
    username: user.username,
    id: user._id
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  res.status(200).send({ token, user });
});

module.exports = router;
