'use strict'
const express = require('express');
const user = require('../models/user');

let router = express.Router();

router.get('/', (req,res)=> {
    
   res.send('Redirect to current user or login'); 
});

router.get('/:id', (req,res)=> {
    
   res.send('Send to user with id ' + req.params.id); 
});

router.post('/new', (req,res) => {
    res.send('Create new user');
});



module.exports = router;
