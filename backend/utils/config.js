require('dotenv').config();

let { PORT, MONGODB_URI } = process.env;

module.exports = {
  MONGODB_URI,
  PORT
};
