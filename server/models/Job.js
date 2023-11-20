const mongoose = require('mongoose');
const JobSchema = mongoose.Schema({
    user: {
        type: String,
        required: false,
    },
    fullname: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
    },
    budgetFrom: {
        type: String,
        required: false,
    },
    budgetTo: {
        type: String,
        required: false,
    },
    bids: {
        type: Number,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    bid: [],
    star: {
        type: String,
        required: false,
    },
    categorie: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timesstamps: true })
module.exports = mongoose.model('Job', JobSchema);