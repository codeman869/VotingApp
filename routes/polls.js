'use strict'
const express = require('express');
let router = express.Router();

const Poll = require('../models/poll');

router.get('/new', isAuthenticated, (req,res) => {
    
     
    res.render('polls/new', {request: req});
    
});

router.post('/new', isAuthenticated, (req,res) => {
    
    //console.log(req);
    
    let newPoll = new Poll();
    
    newPoll.question = req.body.question;
    newPoll.options.push({option: req.body.option1, votes: 0});
    newPoll.options.push({option: req.body.option2, votes: 0});
    newPoll.owner_id = req.user['_id'];
    
    
    newPoll.save((err) => {
        
        if(err) console.warn(err);
        
        res.redirect(`/polls/${newPoll['_id']}`);
        
        
    });
    
});

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


function isAuthenticated(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
    
}    

module.exports = router