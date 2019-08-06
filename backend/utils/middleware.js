const mongoose = require('mongoose');
const config = require('./config');

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({
      error: 'malformation id'
    });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message
    });
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    });
  }

  next();
};

const unknownEndpoint = (req, res) => {
  return res.status(401).send({ error: 'unknown endpoint' });
};

const requestLog = (req, res, next) => {
  console.log('========');
  console.log('Time: ', Date.now());
  console.log('Method: ', req.method);
  console.log('Body: ', req.body);
  console.log('Path: ', req.path);
  console.log('========');
  next();
};

const getToken = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    // return the version where there is no bearer token
    return authorization.substring(7);
  }
  return null;
};

const connectToDatabase = () => {
  mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
      console.log('successfully connected to database (mongoDb)');
    })
    .catch(e => {
      console.log(e);
    });
};

module.exports = {
  connectToDatabase,
  getToken,
  requestLog,
  errorHandler,
  unknownEndpoint
};
