'use strict'

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routers/UserRouter');
const recipeRouter = require('./routers/RecipeRouter');
const bodyParser = require('body-parser');
const passport = require('passport');

// this is so .env-files work
require('dotenv').config();

// express methods
const app = express();

// json webtoken authentication middleware everywhere except login and register routes
const unless = require('express-unless');
const jwt = require('jsonwebtoken');
const secret = require('./config/jwtConfig').secret;

const authMiddleware = (req, res ,next) => {
    try {
        // check request header for token
        const token = req.headers['access-token'];

        // decode token
        if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    console.log('Token decode error: ' + err);
                    return res.json({ success: false, message: 'invalid token'});
                } else {
                    req.decoded = decoded;
                }
            });
        } else {
            // if no token
            return res.status(403).json({ message: 'no token provided' });
        }
    } catch(err) {
        res.status(500).json({ message: 'internal server error'});
    }

    next();
};
authMiddleware.unless = unless;

app.use(authMiddleware.unless({
    path: [
        '/users/login',
        '/users/register',
        { url: '/', methods: ['GET', 'POST', 'PUT', 'DELETE']  }
    ]
}));

// Passport config
require('./config/passport')(passport);

// server config
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
// define the routes for user + recipe stuffs
app.use('/users', userRouter);
app.use('/recipes', recipeRouter);

// when connection to database is succesfll, start server
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/SSSF-project`, { useNewUrlParser: true }).then(() => {
    console.log('Conection to DB succesfull!');

    app.listen(process.env.DB_PORT, () => {
        console.log(`Server running on ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    });
});
