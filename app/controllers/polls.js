'use strict'
const mongoose = require('mongoose');
const Poll = mongoose.model('Poll');
const User = mongoose.model('User');


exports.newPoll = function(req,res) {
    
    res.render('polls/new', {request: req});
    
}

exports.create = function(req,res) {
    
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
    
}

exports.show = function(req,res) {
    Poll.findById(req.params.id,(err,poll) =>{
        if(err) return res.send('Could not find poll');
            
        res.render('polls/poll', {request: req, poll: poll});
            
    });
        
}

exports.vote = function(req,res) {
    
    Poll.findById(req.params.id, (err,poll) => {
        if(err) res.redirect('/');
        
        let auth = req.isAuthenticated();
            
        if(req.body.radioOptions === 'addOption') {
            
            if(!auth) return res.sendStatus(401);
            
            poll.addOption(req.body.newOption, (err) => {
                if(err) return res.redirect(`/polls/${poll._id}`);
                
                poll.voteFor(poll.options.length - 1, (err) => {
                    
                    if(err) return res.redirect(`/polls/${poll._id}`);
                    
                    res.redirect(`/polls/${poll._id}`);
                    
                });
                
            });
            
        } else {
        
            poll.voteFor(Number(req.body.radioOptions), (err) => {
            
                if(err) return res.redirect(`/polls/${poll._id}`);
            
                res.redirect(`/polls/${poll._id}`);
            
            });
        
        }
        
        
    });
    
    //res.json({completed: true});
    
}

exports.showAll = function(req,res) {
    //console.log('getting polls')
   
    var query = Poll.find({}).limit(25).sort({'createdAt': -1});
    
    if(req.query.skip) {
        query.skip(Number(req.query.skip));
    }
    
    query.exec((err,data)=>{
        
        if(err) return res.redirect('/');
        
        User.populate(data, {path: 'owner_id'}, (err,user) => {
            
            //console.log(data);
            
            res.render('polls/pollList', {request: req, polls: data});    
            
            
        });
        
        
        
    });
    
    //res.send('all the poll data');
}

