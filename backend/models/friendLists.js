const mongoose = require('mongoose');

const friendsListsSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    friendList: {
        type: [String],
        required: true
    },
    friendRequests: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('friendsLists', friendsListsSchema);

