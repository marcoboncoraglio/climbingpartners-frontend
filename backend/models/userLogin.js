const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userLoginSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
});

userLoginSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('userLogin', userLoginSchema);