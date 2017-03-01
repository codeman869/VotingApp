'use strict'
const express = require('express');
const mongoose = require('mongoose');

const apiroutes = require('./controllers');

let app = express();

mongoose.connect('mongodb://localhost:27017/voting');

app.use('/api', apiroutes);

app.get('/', (req,res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT);