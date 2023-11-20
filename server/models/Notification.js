const mongoose = require('mongoose');
const Notification = mongoose.Schema({
    user: {
        type: String,
        required: false,
    },
    jobId: {
        type: String,
        required: false,
    },
    userId: {
        type: String,
        required: false,
    },
    userFullname: {
        type: String,
        required: false,
    },
    userEmail: {
        type: String,
        required: false,
    },
    budget: {
        type: String,
        required: false,
    },
    days: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        required: true,
    },
    viewed: {
        type: Boolean,
        required: true,
    }
}, { timesstamps: true })
module.exports = mongoose.model('Notification', Notification);