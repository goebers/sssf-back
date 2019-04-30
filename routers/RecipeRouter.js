'use strict';

const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/RecipeController');

// get all recipes
router.get('/all', (req, res) => {
    recipeController.getAllRecipes().then( (result) => {
        res.send(result);
    });
});

module.exports = router;