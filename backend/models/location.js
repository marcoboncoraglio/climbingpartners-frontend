const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('location', locationSchema);