const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
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