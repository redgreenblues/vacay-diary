const User = require('../models/schema/users.model');
const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');

module.exports = {
    register(req, res) {
        res.render('registration.ejs')
    },
    login(req, res) {
        res.render('login.ejs')
    },
    async registerHandler(req, res) {
        const { firstName, lastName, email, password, password2 } = await req.body;
        let errors = [];
        let errors_two = [];

        // Validation
        // if (!firstName || !lastName || !email || !password || !password2) errors.push({ msg: 'Please fill in all the fields' });
        if(!firstName) errors.push({ firstNameMsg: 'First name cannot be empty' });
        if(!lastName) errors.push({ lastNameMsg: 'Last name cannot be empty' });
        if(!email) errors.push({ emailMsg: 'Email cannot be empty' });
        if(!password) errors.push({ passwordMsg: 'Password cannot be empty' });
        if(!password2) errors.push({ password2Msg: 'Please confirm your password' });

        if (password !== password2) errors_two.push({ msg: 'Passwords do not match' });
        if (password.length < 8 && password.length > 0) errors_two.push({ msg: 'Password should be at least 8 characters' });

        if (errors.length > 0) {
            res.render('registration.ejs', {
                errors,
                errors_two,
                firstName,
                lastName,
                email,
                password,
                password2
            })
        } else {
            // If Validation passed, goes to else block
            const result = UserRepository.findOne(email); // Find if email exists in database
            result.then(user => {
                if (user) { // If user exists in database
                    errors_two.push({ msg: 'Email is already registered' });
                    res.render('registration.ejs', {
                        errors,
                        errors_two,
                        firstName,
                        lastName,
                        email,
                        password,
                        password2
                    })
                } else { // If email does not exists in database, create a new User
                    bcrypt.genSalt(10, async (err, salt) => {
                        try {
                            const newUser = new User({ _id: mongoose.Types.ObjectId(), firstName, lastName, email, password });
                            newUser.password = bcrypt.hashSync(newUser.password, salt);
                            await newUser.save();
                            req.flash('success_msg', 'Registration successful. You are able to login now')
                            res.redirect('/login');
                        } catch (err) { 
                            res.send(err.message);
                        }
                    })
                }
            })
        }
    },
    loginHandler(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/app',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    },
    logout(req, res) {
        req.logout();
        res.redirect('/');
    }
}
