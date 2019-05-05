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

exports.getRecipeById = (id) => {
    const query = {_id: id};

    return Recipe.findOne(query).then( (recipe) => {
        return recipe;
    }).catch( (err) => {
        console.log('Get single recipe by ID error: ' + err);
        return err;
    });
};