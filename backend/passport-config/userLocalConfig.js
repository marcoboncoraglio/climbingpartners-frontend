const LocalStrategy = require('passport-local').Strategy;
const UserLogin = require('../models/userLogin');

module.exports = function loadUserConfig(passport){
    passport.use(new LocalStrategy(UserLogin.authenticate()));
    passport.serializeUser(UserLogin.serializeUser());
    passport.deserializeUser(UserLogin.deserializeUser());
}

