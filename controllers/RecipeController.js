'use strict';

const Recipe = require('../models/Recipe');

exports.getAllRecipes = () => {
    return Recipe.find().then( (recipes) => {
        return recipes;
    }).catch( (err) => {
        console.log('Get all recipes error: ' + err);
        return err;
    });
};