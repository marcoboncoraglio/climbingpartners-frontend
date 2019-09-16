const mongoose = require('mongoose');

const userCardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        default: "https://arc.sdsu.edu/images/aztecadventures/rock-climbing/headers/small/rock-climbing.jpg"
    }
});

module.exports = mongoose.model('userCard', userCardSchema);