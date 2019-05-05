'use strict';

const Recipe = require('../models/Recipe');

// get all recipes
exports.getAllRecipes = (req, res, next) => {
    return Recipe.find().then( (recipes) => {
        res.json(recipes);
    }).catch( (err) => {
        console.log('Get all recipes error: ' + err);
        return err;
    });
};

// get recipe by id
exports.getRecipeById = (id, req, res, next) => {
    const query = {_id: id};

    return Recipe.findOne(query).then( (recipe) => {
        res.json(recipe);
    }).catch( (err) => {
        console.log('Get single recipe by ID error: ' + err);
        return err;
    });
};

// create new recipe
exports.createRecipe = (res, req, next) => {
    const newRecipe = new Recipe({
        title: req.body.title,
        description: req.body.description,
        image: '',
        owner_user_id: req.body.userId
    });


    return Recipe.create(query).then( (recipe) => {
        res.json(recipe);
    }).catch( (err) => {
        console.log('Get single recipe by ID error: ' + err);
        return err;
    });
};