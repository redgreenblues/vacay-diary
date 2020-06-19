const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserRepository = require('../repositories/userRepository');
const User = require('../models/schema/users.model');

module.exports = passport => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            const result = UserRepository.findOne(email); // Match user by email
            result.then(user => {
                if (!user) return done(null, false, { message: 'Email is not registered' });

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    isMatch ? done(null, user) : done(null, false, { message: 'Password is incorrect' });
                })
            }).catch(err => {
                console.log(err.message);
            })
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}