const express = require('express');
const passport = require('passport');
const UserLogin = require('../models/userLogin');
const router = express.Router();

//TODO: check generation of session here and in index.html
//TODO: return uid from which frontend's loginstore generates residual objects
router.post('/register', (req, res, next) => {
    UserLogin.register(new UserLogin({ username: req.body.username }), req.body.password, (err, account) => {
        if (err) {
            return res.json({ error: err.message });
        }

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.json({user: account});
            });
        });
    });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (hashErr, user, info) => {
        if (hashErr) { 
            return res.json({ message: hashErr }); 
        }
        if (!user) { 
            return res.json({ message: info.message }); 
        }

        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            res.json({ user: user });
        });
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.status(200);
    });
});

module.exports = router;