const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { getToken } = require('../utils/middleware');

router.get('/', async (req, res, next) => {
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      res.status(401).json({ error: 'you need a token to get expenses' });
    }
    const user = await User.findById(decodedToken.id);
    if (user) {
      const populatedUser = await User.find({
        username: user.username
      }).populate('expenses');

      res.json(populatedUser);
    } else {
      res.status(401).json({ error: 'user not found or invalid token' });
    }
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const time = new Date();
    const body = req.body;
    const salt = 10;
    const passwordHash = await bcrypt.hash(body.password, salt);
    const user = new User({
      name: body.name,
      username: body.username,
      passwordHash,
      monthlySalary: 0,
      registerationDate: `${time.getHours()}:${time.getMinutes()} ${time.getDate()}.${time.getMonth() +
        1}.${time.getFullYear()}`,
      expenses: []
    });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (e) {
    next(e);
  }
});

router.put('/:id/name', async (req, res, next) => {
  const { name } = req.body;
  const token = getTokenFrom(req);
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const userToChange = await User.find({ _id: req.params.id });
    const updatedUser = { ...userToChange, name: name };
    const saveUser = await User.findByIdAndUpdate(req.params.id, updatedUser, {
      new: true
    });
    res.json(saveUser.toJSON());
  } catch (e) {
    next(e);
  }
});

router.put('/:id/username', async (req, res, next) => {
  const { username } = req.body;
  const token = getTokenFrom(req);
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.td) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const userToChange = await User.find({ _id: req.params.id });
    const saveUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...userToChange, username: username },
      { new: true }
    );
    res.json(saveUser.json());
  } catch (e) {
    next(e);
  }
});

module.exports = router;
