'use strict';

const User = require('../models/User');
const bcrypt = require('bcrypt');

// return all users 
exports.getAllUsers = () => {
    return User.find().then( (users) => {
        return users;
    }).catch( (err) => {
        console.log('Get all users error: ' + err);
        return err;
    });
};

exports.getUserByUsername = (username) => {
    const query = {username: username};

    return User.findOne(query).then( (user) => {
        return user;
    }).catch( (err) => {
        console.log('Get single user by username error: ' + err);
        return err;
    });
};

exports.getUserById = (id) => {
    const query = {_id: id};

    return User.findOne(query).then( (user) => {
        return user;
    }).catch( (err) => {
        console.log('Get single user by ID error: ' + err);
        return err;
    });
};

exports.loginUser = (data) => {
    // debug
    console.log('loginUser data');
    console.log(data);
};

exports.registerUser = (data) => {
    // debug
    console.log('registerUser data');
    console.log(data);

    const newUser = new User({
        username: data.username,
        hash: data.password,
        email: data.email
    });

    createUser(newUser);
};

const createUser = (newUser) => {
    bcrypt.genSalt(10, (err, salt) => {
        if(!err) {
            bcrypt.hash(newUser.hash, salt, (err, hash) => {
                if(!err) {
                    newUser.hash = hash;
                    newUser.save(newUser);
                } else {
                    console.log(err);
                }
                
            });
        } else {
            console.log(err);
        }
    });
};

const comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) {
            throw err;   
        }
        
        callback(null, isMatch);
    });
};