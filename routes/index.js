'use strict'
const express = require('express');
let router = express.Router();

const pollRoutes = require('./polls');
const userRoutes = require('./users');

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
        res.render('signup', {request: req});
    })
    
    router.get('/login', (req,res) => {
        
        res.render('login', {request: req});
        
    });
    
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/login'
    }));
    
    router.get('/home', isAuthenticated, (req,res) => {
       
       res.render('home', {user: req.user.username, request: req}); 
    });
    
    router.delete('/logout', isAuthenticated, (req,res) => {
        
        req.logout();
        
        res.render('login', {request: req});
        
    });
    
    router.use('/users', userRoutes);
    
    router.use('/polls', pollRoutes);
    
    return router;
}

function isAuthenticated(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}