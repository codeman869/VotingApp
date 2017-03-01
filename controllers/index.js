'use strict'
const express = require('express');
const users = require('./users');

let router = express.Router();

router.use('/users', users);


module.exports = router;