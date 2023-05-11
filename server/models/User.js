const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
    followers: {
        type: Array,
        defaultValue: []  
    },
    following: {
        type: Array,  
        defaultValue: []
    },
    profileDesc: {
        type: String
    }

}, {timestamps: true})


module.exports = mongoose.model('User', userSchema);