'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// get all users
router.get('/all', (req, res, next) => {
    userController.getAllUsers(req, res, next);
});

// get single user by username
router.get('/username/:userName', (req, res, next) => {
    userController.getUserByUsername(req.params.userName, req, res, next);
});

// get single user by id
router.get('/id/:id', (req, res, next) => {
    userController.getUserById(req.params.id, req, res, next);
});

// post login
router.post('/login', (req, res, next) => {
    userController.loginUser(req, res, next); 
});

// post register
router.post('/register', (req, res, next) => {
    userController.createUser(req.body, req, res, next);
});

module.exports = router;