const mongoose = require('mongoose');
const JobSchema = mongoose.Schema({
    userid: {
        type: String,
        required: false,
    },
    postid: {
        type: String,
        required: false,
    },
    amount: {
        type: String,
        required: false,
    },
    days: {
        type: String,
        required: false,
    },
    desc: {
        type: String,
        required: false,
    },
    fullname: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timesstamps: true })
module.exports = mongoose.model('Bid', JobSchema);