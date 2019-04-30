'use strict'

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routers/UserRouter');
const recipeRouter = require('./routers/RecipeRouter');

// this is so .env-files work
require('dotenv').config()

// express methods
const app = express();

// make the server use cors
app.use(cors());

// when connection to database is succesfll, start server
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/SSSF-project`, { useNewUrlParser: true }).then(() => {
    console.log('Conection to DB succesfull');

    app.listen(process.env.DB_PORT, () => {
        console.log(`Server running on ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    });
});

// define the endpoint for user stuffs
app.use('/users', userRouter);

// define the endpoint for recipe stuffs
app.use('/recipes', recipeRouter);
