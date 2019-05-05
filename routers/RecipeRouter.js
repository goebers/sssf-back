'use strict';

const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/RecipeController');

// get all recipes
router.get('/all', (req, res, next) => {
    recipeController.getAllRecipes().then( (result) => {
        res.send(result);
    });
});

// get single recipe by id
router.get('/id/:id', (req, res, next) => {
    recipeController.getRecipeById(req.params.id).then( (result) => {
        res.send(result);
    });
});

module.exports = router;