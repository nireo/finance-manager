const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./controllers/users');
const app = express();
const expenseRouter = require('./controllers/expense');
const loginRouter = require('./controllers/login');
const {
  connectToDatabase,
  requestLog,
  unknownEndpoint,
  errorHandler
} = require('./utils/middleware');
mongoose.set('useFindAndModify', false);

connectToDatabase();

// make app use bodyParser
app.use(bodyParser.json());

// make app use Cross-origin resource sharing
app.use(cors());

// define other routers
app.use('/api/users', userRouter);
app.use('/api/expenses', expenseRouter);
app.use('/api/login', loginRouter);

module.exports = app;
