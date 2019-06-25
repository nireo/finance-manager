// import needed dependencies
const mongoose = require("mongoose"),
      Schema = mongoose.Schema

// define schema
const UserSchema = new Schema({
    name: String,
    username: String,

    // since it's really bad plain text passwords
    passwordHash: String,
    monthlySalary: Number,
    expenses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Expenses'
        }
    ],
    registerationDate: String,
})

// export schema
module.exports = mongoose.model("User", UserSchema)