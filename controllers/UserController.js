'use strict';

const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

// json web token config
const jwt = require('jsonwebtoken');
const secret = require('../config/jwtConfig').secret;

// dot env files conf
require('dotenv').config();

// return all users 
exports.getAllUsers = (req, res, next) => {
    User.find().then( (user) => {
        res.json(user);
    }).catch( (err) => {
        console.log('Get all users error: ' + err);
        return err;
    });
};

// return single user by username
exports.getUserByUsername = (username, req, res, next) => {
    const query = {username: username};

    User.findOne(query).then( (user) => {
        res.json(user);
    }).catch( (err) => {
        console.log('Get single user by username error: ' + err);
        return err;
    });
};

// return single user by id
exports.getUserById = (id, req, res, next) => {
    const query = {_id: id};

    User.findOne(query).then( (user) => {
        res.json(user);
    }).catch( (err) => {
        console.log('Get single user by ID error: ' + err);
        return err;
    });
};

// authenticate user
exports.loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // error handling
        if (err) {
            return next(err);
        }

        // invalid username and/or password
        if (!user) {
            console.log('eipä ollu user');
            return res.json({ message: 'authentication was unsuccessfull', token: null });
        }

        // correct username & password
        console.log(user);

        const payload = {
            check: true
        };

        const token = jwt.sign(payload, secret, {
            expiresIn: Number.parseInt(process.env.JWT_EXPIRATION) // expires in 24 hours (parseint as a hack)
        });

        return res.json({ message: 'authentication was successfull', token: token, userId: user['_id'], tokenMaxAge: process.env.JWT_EXPIRATION }); // 86400 = 24 hours
    })(req, res, next);
};

// register new user
exports.createUser = (data, req, res, next) => {
    if (data.password == data.password2) {
        // assemble new user
        const newUser = new User({
            username: data.username,
            hash: data.password,
            email: data.email
        });

        // generate the salt
        bcrypt.genSalt(10, (err, salt) => {
            if(!err) {
                // do the hashing
                bcrypt.hash(newUser.hash, salt, (err, hash) => {
                    if(!err) {
                        // create & send new token
                        const payload = {
                            check: true
                        };
                        
                        const token = jwt.sign(payload, secret, {
                            expiresIn: Number.parseInt(process.env.JWT_EXPIRATION) // expires in 24 hours (parseint as a hack)
                        });

                        // set hash and save newUser
                        newUser.hash = hash;
                        newUser.save(newUser);
                        
                        return res.json({ message: 'creation of new user was successfull', token: token, userId: newUser['_id'], tokenMaxAge: process.env.JWT_EXPIRATION }); // 86400 = 24 hours
                    } else {
                        console.log(err);
                    }
                    
                });
            } else {
                console.log(err);
            }
        });
    } else {
        return res.json({ message: 'passwords are not the same' });
    }
    
};