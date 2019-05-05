'use strict';

const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Load User model
const User = require('../models/User');

module.exports = ((passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
            // match user
            User.findOne({ username: username}).then( user => {
                if(!user) {
                    return done(null, false, { message: 'No username found' });
                }

                // match password
                bcrypt.compare(password, user.hash, (err, isMatch) => {
                    if(err) {
                        console.log('Bcrypt compare error: ' + err);
                    }

                    if(isMatch) {
                        return done(null, user, { message: 'Authentication successfull!'});
                    } else {
                        return done(null, false, { message: 'Password incorrect' })
                    }
                });
            }).catch(err => {
                console.log('Error: ' + err);
            });
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

});