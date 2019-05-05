'use strict';

const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

// json web token config
const jwt = require('jsonwebtoken');
const secret = require('../config/jwtConfig').secret;

// return all users 
exports.getAllUsers = () => {
    return User.find().then( (users) => {
        return users;
    }).catch( (err) => {
        console.log('Get all users error: ' + err);
        return err;
    });
};

// return single user by username
exports.getUserByUsername = (username) => {
    const query = {username: username};

    return User.findOne(query).then( (user) => {
        return user;
    }).catch( (err) => {
        console.log('Get single user by username error: ' + err);
        return err;
    });
};

// return single user by id
exports.getUserById = (id) => {
    const query = {_id: id};

    return User.findOne(query).then( (user) => {
        return user;
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
            expiresIn: 1440 // expires in 24 hours
        });

        return res.json({ message: 'authentication was successfull', token: token });
    })(req, res, next);
};

// register new user
exports.registerUser = (data, req, res, next) => {
    if (data.password == data.password2) {
        const newUser = new User({
            username: data.username,
            hash: data.password,
            email: data.email
        });

        createUser(newUser, req, res, next);
    } else {
        return res.json({ message: 'passwords are not the same' });
    }
    
};

// create new user, hash the password and store it in DB
const createUser = (newUser, req, res, next) => {
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
                        expiresIn: 1440 // expires in 24 hours
                    });

                    newUser.hash = hash;
                    newUser.save(newUser);
                    
                    return res.json({ message: 'creation of new user was successfull', token: token });
                } else {
                    console.log(err);
                }
                
            });
        } else {
            console.log(err);
        }
    });
};