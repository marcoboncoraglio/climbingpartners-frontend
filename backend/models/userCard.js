const mongoose = require('mongoose');

const userCardSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
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