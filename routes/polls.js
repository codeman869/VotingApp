'use strict'
const express = require('express');
let router = express.Router();

const Poll = require('../models/poll');

router.get('/:id', (req,res) => {
    Poll.findById(req.params.id,(err,poll) =>{
        if(err) return res.send('Could not find poll');
            
        //res.render('polls/poll', {question: poll.question});
        
        res.json(poll);
            
    });
        
});
    
router.get('/', (req,res) => {
    //console.log('getting polls')
    res.send('all the poll data');
});
    

module.exports = router