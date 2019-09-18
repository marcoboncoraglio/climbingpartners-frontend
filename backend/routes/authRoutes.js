const express = require('express');
const passport = require('passport');
const UserLogin = require('../models/userLogin');
const router = express.Router();

const frontendUrl = 'http://localhost:3000';

//TODO: check generation of session here and in index.html
router.post('/register', (req, res, next) => {
    UserLogin.register(new UserLogin({ username: req.body.username }), req.body.password, (err, account) => {
        if (err) {
            return res.status(err.status || 500).json({ error: err.message });
        }

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect(frontendUrl);
            });
        });
    });
});

router.post('/login', passport.authenticate('local', { failureFlash: true }), (req, res, next) => {

    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect(frontendUrl);  
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect(frontendUrl);
    });
});

module.exports = router;