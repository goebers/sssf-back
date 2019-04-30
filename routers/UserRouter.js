'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userController = require('../controllers/UserController');
const passport = require('passport');

// get all users
router.get('/all', (req, res) => {
    userController.getAllUsers().then( (result) => {
        res.send(result);
    });
});

// get single user by username
router.get('/username/:userName', (req, res) => {
    userController.getUserByUsername(req.params.userName).then( (result) => {
        res.send(result);
    });
});

// get single user by id
router.get('/id/:id', (req, res) => {
    userController.getUserById(req.params.id).then( (result) => {
        res.send(result);
    });
});

// post login
router.post('/login', bodyParser.urlencoded({extended: true}), (req, res) => {
    userController.loginUser(req.body);

    res.send('Called /login');  
});

// post register
router.post('/register', bodyParser.urlencoded({extended: true}), (req, res) => {
    userController.registerUser(req.body);

    res.send('Called /register');  
});

module.exports = router;