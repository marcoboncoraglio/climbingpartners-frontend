const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    about: {
        type: String,
        default: 'Hi there!'
    },
    availableEquipment: {
        type: [String],
        default: ['60m Rope']
    },
    climbingStyles: {
        type: [String],
        default: ['Lead', 'Bouldering']
    },
    languagesSpoken: {
        type: [String],
        default: ['English']
    }
});

module.exports = mongoose.model('userDetails', userDetailsSchema);