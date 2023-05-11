const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)


const speechSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
        max: 280
    },
    likes: {
        type: Array,
        defaultValue: []
    },
    comments: {
        type: Array,
        defaultValue: []
    }
}, {timestamps: true})


module.exports = mongoose.model('Speech', speechSchema);