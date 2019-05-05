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

/**
 * @api {get} /recipes/all Get all recipes
 * @apiName getAllRecipes
 * @apiGroup Recipes
 * 
 * @apiHeader {String} access-token JSON web token
 * 
 * @apiSuccess {Array} recipes Array of all recipes
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *   {
 *       "_id": "id",
 *       "title": "title",
 *       "description": "description",
 *       "image": "image-path"
 *   }
 *  ]
 */
router.get('/all', (req, res, next) => {
    recipeController.getAllRecipes(req, res, next);
});

/**
 * @api {get} /recipes/id/:id Get a single recipe
 * @apiName getrecipeById
 * @apiGroup Recipes
 * 
 * @apiHeader {String} access-token JSON web token
 * 
 * @apiParam {String} id Recipes unique id.
 * 
 * @apiSuccess {String} _id Recipes unique id.
 * @apiSuccess {String} title Recipes title.
 * @apiSuccess {String} description Recipes description.
 * @apiSuccess {String} image Recipes image as a path.
 * @apiSuccess {String} title Recipes title.
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *   {
 *       "_id": "id",
 *       "title": "title",
 *       "description": "description",
 *       "image": "image-path"
 *   }
 */
router.get('/id/:id', (req, res, next) => {
    recipeController.getRecipeById(req.params.id, req, res, next);
});

/**
 * @api {post} /recipes/new Create new recipe
 * @apiName createRecipe
 * @apiGroup Recipes
 * 
 * @apiHeader {String} access-token JSON web token
 * @apiHeader {String} Content-Type multipart/form-data
 * 
 * @apiParam {String} title New recipes title.
 * @apiParam {String} description New recipes description.
 * @apiParam {File} image New recipes image.
 * @apiParam {String} userId New recipes owner id.
 * 
 * @apiSuccess {String} _id Recipes unique id.
 * @apiSuccess {String} title Recipes title.
 * @apiSuccess {String} description Recipes description.
 * @apiSuccess {String} image Recipes image as a path.
 * @apiSuccess {String} title Recipes title.
 * @apiSuccess {String} ownerId Recipes owner's user id.
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *   {
 *       "_id": "id",
 *       "title": "title",
 *       "description": "description",
 *       "image": "image-path",
 *       "ownerId": "ownerId"
 *   }
 */
router.post('/new', upload.single('image'), (req, res, next) => {
    recipeController.createRecipe(req.body, req, res, next)
});

module.exports = router;