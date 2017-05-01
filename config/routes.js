'use strict'

const users = require('../app/controllers/users');
const polls = require('../app/controllers/polls');

function isAuthenticated(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
    
}


/**
 * Expose
 */

module.exports = function(app, passport) {
    app.get('/', (req,res) => {
        res.render('index', {request: req});
        
    });
    
    // user routes
    
    app.get('/signup', users.signup);
    app.get('/login', (req,res) => {
        
        if(req.isAuthenticated()) return res.redirect('/home');
        
        users.login(req,res);
        
    });
    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup'
    }));
    app.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/login'
    }));
    app.get('/home', isAuthenticated, users.home);
    app.delete('/logout', isAuthenticated, users.logout);
    app.post('/users/exists', users.checkExists);
    
    // Twitter Auth Routes
    
    app.get('/auth/twitter', passport.authenticate('twitter'));
    
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/home', 
        failureRedirect: '/login'}));
    
    
    // poll routes
    
    app.get('/polls/new', isAuthenticated, polls.newPoll);
    app.post('/polls/new', isAuthenticated, polls.create);
    app.get('/polls/:id', polls.show);
    app.post('/polls/:id/vote', polls.vote);
    app.get('/polls', polls.showAll);
    app.delete('/polls/:id', isAuthenticated, polls.delete);
    
}