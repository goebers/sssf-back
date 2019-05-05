'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, unique: true, required: [true, "Username cannot be empty."], lowercase: true, index: true},
    email: {type: String, unique: true, required: [true, "Email cannot be empty."], lowercase: true, index: true},
    hash: String
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
