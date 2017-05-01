'use strict'
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Poll = mongoose.model('Poll');
    
exports.signup = function(req,res) {
    res.render('signup', {request: req});
};
    
exports.login = function(req,res) {
    res.render('login', {request: req});
};
    

exports.home = function(req,res) {
    var id = req.user._id;
    //console.log(id);
    
    Poll.find({owner_id: id}, (err,data) => {
        if(err) return res.redirect('/');
        if(data == null) return res.render('home', {user: req.user.username, request: req, polls: "No Polls Found"})
        res.render('home', {user: req.user.username, request: req, polls: data});
        
    });
    
     
};
    
    
exports.logout = function(req,res) {
        
    req.logout();
        
    res.render('login', {request: req});
        
};
    
exports.checkExists = function(req,res) {
    User.find({username: req.body.username}, (err,usr) =>{
            
        if(err) return res.json(err);
        
        if(!usr[0]) return res.json({username: false});
        
        res.json({username: true});
    });
};
    
/*
exports.signup = function(req,res) {
    res.render('signup', {request: req});
}

exports.login = function(req,res) {
    res.render('login', {request: req});
}

exports.create = function(req,res) {
    passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup'
    });
}
*/