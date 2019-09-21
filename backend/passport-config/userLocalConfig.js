const UserLogin = require('../models/userLogin');

module.exports = function loadUserConfig(passport){
    passport.use(UserLogin.createStrategy());
    passport.serializeUser(UserLogin.serializeUser());
    passport.deserializeUser(UserLogin.deserializeUser());
}

