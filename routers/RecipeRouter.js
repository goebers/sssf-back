'use strict';

const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/RecipeController');
const multer = require('multer');

// multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload-images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// get all recipes
router.get('/all', (req, res, next) => {
    recipeController.getAllRecipes(req, res, next);
});

// get single recipe by id
router.get('/id/:id', (req, res, next) => {
    recipeController.getRecipeById(req.params.id, req, res, next);
});

// post a new recipe
router.post('/new', upload.single('image'), (req, res, next) => {
    recipeController.createRecipe(req.body, req, res, next)
});

// post a new recipe
router.patch('/id/:id', (req, res, next) => {
    recipeController.createRecipe(req.body, req, res, next)
});

module.exports = router;