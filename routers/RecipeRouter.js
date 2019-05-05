'use strict';

const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/RecipeController');

// get all recipes
router.get('/all', (req, res, next) => {
    recipeController.getAllRecipes(req, res, next);
});

// get single recipe by id
router.get('/id/:id', (req, res, next) => {
    recipeController.getRecipeById(req.params.id, req, res, next);
});

// post a new recipe
router.post('/new', (req, res, next) => {
    recipeController.createRecipe(req, res, next)
});

module.exports = router;