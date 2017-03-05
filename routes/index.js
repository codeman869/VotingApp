'use strict'
const express = require('express');
let router = express.Router();

const pollRoutes = require('./polls');

module.exports = (passport) => {
    
    router.get('/', (req,res) => {
        res.send('Hello World!');
    });
    
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup'
    }));
    
    router.get('/signup', (req,res) => {
        //console.log('this was a get request');
        res.render('signup');
    })
    
    router.get('/login', (req,res) => {
        res.render('login');
        
    });
    
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/login'
    }));
    
    router.get('/home', isAuthenticated, (req,res) => {
       res.render('home', {user: req.user.username}); 
    });
    
    router.use('/polls', pollRoutes);
    
    return router;
}

function isAuthenticated(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}