'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// get all users
router.get('/all', (req, res, next) => {
    userController.getAllUsers().then( (result) => {
        res.send(result);
    });
});

// get single user by username
router.get('/username/:userName', (req, res, next) => {
    userController.getUserByUsername(req.params.userName).then( (result) => {
        res.send(result);
    });
});

// get single user by id
router.get('/id/:id', (req, res, next) => {
    userController.getUserById(req.params.id).then( (result) => {
        res.send(result);
    });
});

// post login
router.post('/login', (req, res, next) => {
    userController.loginUser(req, res, next);

    // res.send('Called /login');  
});

// post register
router.post('/register', (req, res, next) => {
    userController.registerUser(req.body, req, res, next);

    // res.send({ message: 'Called /register' });  
});

module.exports = router;