'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: String,
    description: String,
    favorites: Number,
    image: String,
    owner_user_id: String
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);