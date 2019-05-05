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
exports.createRecipe = (data, req, res, next) => {
    const image = req.file;
    console.log(data);

    // construct new recipe that gets sent to DB
    const newRecipe = new Recipe({
        title: data.title,
        description: data.description,
        image: image.path,
        ownerId: data.userId
    });

    return Recipe.create(newRecipe).then( (recipe) => {
        res.json(recipe);
    }).catch( (err) => {
        console.log('Get single recipe by ID error: ' + err);
        return err;
    });
};