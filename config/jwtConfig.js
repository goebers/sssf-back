'use strict';

// this is so .env-files work
require('dotenv').config();

module.exports = {
    secret: process.env.JWT_SECRET
}