// import needed dependencies
const mongoose = require("mongoose"),
      Schema = mongoose.Schema

// define schema
const UserSchema = new Schema({
    // basic credentials
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    // since it's really bad to store plain text passwords
    passwordHash: {
        type: String,
        required: true
    },
    monthlySalary: Number,
    expenses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Expense'
        }
    ],
    registerationDate: String,
})

// export schema
module.exports = mongoose.model("User", UserSchema)