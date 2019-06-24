const mongoose = require("mongoose"),
      Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    username: String,
    passwordHash: String,
    monthlySalary: Number,
    expenses = [
        {
            type: Schema.Types.ObjectId,
            ref: 'Expenses'
        }
    ]
})

module.exports = mongoose.model("User", UserSchema)