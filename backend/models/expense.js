// import needed dependencies
const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

// define schema
const ExpenseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  // reference to user since we don't want others seeing
  // some random users expenses :)
  byUser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // use this just to define if expense is a source of money or use of money
  profit: {
    type: Boolean,
    required: true
  },
  time: String,
  // array for different reminders the user can set
  reminders: [String],
  // the color used for the graphs for added customizability
  color: {
    type: String,
    required: true
  }
});

ExpenseSchema.plugin(uniqueValidator);

ExpenseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  }
});

//export schema
module.exports = mongoose.model('Expense', ExpenseSchema);
