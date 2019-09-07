const router = require('express').Router();
const Expenses = require('../models/expense');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { getToken } = require('../utils/middleware');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7);
  }
  return null;
};

router.get('/', async (req, res, next) => {
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res
        .status(401)
        .json({ error: 'you need a token to get expenses' });
    }

    const user = await User.findById(decodedToken.id);
    const allExpenses = await Expenses.find({ byUser: user._id }).populate(
      'user'
    );
    res.json(allExpenses.map(expense => expense.toJSON()));
  } catch (e) {
    // if something goes wrong
    res.status(401).json({ error: 'you need a token to get expenses' });
  }
});

router.post('/', async (req, res, next) => {
  const time = new Date();
  const body = req.body;
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const expense = new Expenses({
      title: body.title,
      value: body.value,
      time: `${time.getHours()}:${time.getMinutes()} ${time.getDate()}.${time.getMonth()}.${time.getFullYear()}`,
      profit: body.profit,
      byUser: user._id,
      color: body.color
    });

    const savedExpense = await expense.save();
    user.expenses = user.expenses.concat(savedExpense._id);
    await user.save();
    res.json(savedExpense.toJSON());
  } catch (e) {
    next(e);
  }
});

// put request for change money value
router.put('/:id', async (req, res, next) => {
  const { value } = req.body;
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      e;
      return res.status(401).json({
        error: 'token missing or invalid'
      });
    }

    const newExpense = { ...expense, value: value };
    const changedExpense = await Expenses.findByIdAndUpdate(
      req.params.id,
      newExpense,
      { new: true }
    );
    res.json(changedExpense.toJSON());
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const expense = await Expenses.findById(req.params.id);

    if (expense.byUser.toString() === decodedToken.id) {
      await Expenses.findByIdAndRemove(expense._id);
      // end the request so it doesn't run forever
      return response.status(204).end();
    } else {
      return res.status(401).json({
        error: 'token missing or invalid'
      });
    }
  } catch (e) {
    next(e);
  }
});

router.post('/:id/reminders', async (req, res, next) => {
  const token = getToken(req);
  const { reminder } = req.body;
  if (!reminder) {
    return res.status(400).json({ error: 'no content, or wrong content' });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    const expense = await Expenses.findById(req.params.id);
    expense.reminders = expense.reminders.concat(reminder);
    const withReminder = await expense.save();
    res.json(withReminder.toJSON());
  } catch (e) {
    next(e);
  }
});

module.exports = router;
