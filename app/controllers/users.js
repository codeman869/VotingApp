'use strict'
const mongoose = require('mongoose');
const User = mongoose.model('User');
    
exports.signup = function(req,res) {
    res.render('signup', {request: req});
};
    
exports.login = function(req,res) {
    res.render('login', {request: req});
};
    

exports.home = function(req,res) {
       
    res.render('home', {user: req.user.username, request: req}); 
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