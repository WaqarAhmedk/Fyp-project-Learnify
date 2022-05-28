const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique:true,

    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    createdat: {
        type: Date,
        default: Date.now
    }
});

const user=mongoose.model("user", UserSchema);
user.createIndexes();
module.exports = user;