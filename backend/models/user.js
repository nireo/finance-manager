// import needed dependencies
const mongoose = require("mongoose"),
      Schema = mongoose.Schema,
      uniqueValidator = require("mongoose-unique-validator")

// define schema
const UserSchema = new Schema({
    // basic credentials
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
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

UserSchema.plugin(uniqueValidator)

// export schema
module.exports = mongoose.model("User", UserSchema)