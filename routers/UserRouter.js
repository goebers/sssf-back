'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

/**
 * @api {get} /users/all Get all users
 * @apiName getAllUsers
 * @apiGroup Users
 * 
 * @apiHeader {String} access-token JSON web token
 * 
 * @apiSuccess {Array} users Array of all users
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *   {
 *       "_id": "userId",
 *       "username": "username",
 *       "hash", "hashed password"
 *       "email": "email"
 *   }
 *  ]
 */
router.get('/all', (req, res, next) => {
    userController.getAllUsers(req, res, next);
});

/**
 * @api {get} /users/username/:userName Get a single user by username
 * @apiName getUserByUsername
 * @apiGroup Users
 * 
 * @apiHeader {String} access-token JSON web token
 * 
 * @apiParam {String} userName Username that gets queried.
 * 
 * @apiSuccess {String} _id Users unique id.
 * @apiSuccess {String} username Users name.
 * @apiSuccess {String} hash Users password hashed.
 * @apiSuccess {String} email Users email.
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *   {
 *       "_id": "userId",
 *       "username": "username",
 *       "hash", "hashed password"
 *       "email": "email"
 *   }
 */
router.get('/username/:userName', (req, res, next) => {
    userController.getUserByUsername(req.params.userName, req, res, next);
});

/**
 * @api {get} /users/id/:id Get a single user by username
 * @apiName getUserById
 * @apiGroup Users
 * 
 * @apiHeader {String} access-token JSON web token
 * 
 * @apiParam {String} id User unique id that gets queried.
 * 
 * @apiSuccess {String} _id Users unique id.
 * @apiSuccess {String} username Users name.
 * @apiSuccess {String} hash Users password hashed.
 * @apiSuccess {String} email Users email.
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *   {
 *       "_id": "userId",
 *       "username": "username",
 *       "hash", "hashed password"
 *       "email": "email"
 *   }
 */
router.get('/id/:id', (req, res, next) => {
    userController.getUserById(req.params.id, req, res, next);
});

/**
 * @api {post} /users/login Log in as a user
 * @apiName loginUser
 * @apiGroup Users
 * 
 * @apiParam {String} username Username of existing user.
 * @apiParam {String} password Password of existing user.
 * 
 * @apiSuccess {String} message Some info about authentication.
 * @apiSuccess {String} token JSON web token.
 * @apiSuccess {String} userId User id.
 * @apiSuccess {String} tokenMaxAge Maximum age of token in seconds.
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *   {
 *       "message": "authentication was succesfull",
 *       "token": "token",
 *       "userId", "userId"
 *       "tokenMaxAge": "420"
 *   }
 */
router.post('/login', (req, res, next) => {
    userController.loginUser(req, res, next); 
});

/**
 * @api {post} /users/register Register a new user
 * @apiName createUser
 * @apiGroup Users
 * 
 * @apiParam {String} username New username.
 * @apiParam {String} password New password.
 * @apiParam {String} password2 New password typed again.
 * @apiParam {String} email New email.
 * 
 * @apiSuccess {String} message Some info about authentication.
 * @apiSuccess {String} token JSON web token.
 * @apiSuccess {String} userId New user id.
 * @apiSuccess {String} tokenMaxAge Maximum age of token in seconds.
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *   {
 *       "message": "authentication was succesfull",
 *       "token": "token",
 *       "userId", "userId"
 *       "tokenMaxAge": "420"
 *   }
 */
router.post('/register', (req, res, next) => {
    userController.createUser(req.body, req, res, next);
});

/**
 * @api {get} /users/validate Check if token is still valid
 * @apiName isTokenValid
 * @apiGroup Users
 * 
 * @apiHeader {String} access-token JSON web token
 * 
 * @apiSuccess {Boolean} isTokenValid Boolean value corresponding to token validity
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *   {
 *       "isTokenValid": true
 *   }
 */
router.get('/validate', (req, res, next) => {
    const token = req.headers['access-token'];
    userController.isTokenValid(token, req, res, next);
});

module.exports = router;