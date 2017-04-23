'use strict'

const users = require('../app/controllers/users');
const polls = require('../app/controllers/polls');

function isAuthenticated(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
    
}

module.exports = function(app, passport) {
    app.get('/', (req,res) => {
        res.send('Hello World!');
        
    });
    
    // user routes
    
    app.get('/signup', users.signup);
    app.get('/login', users.login);
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
    
    // poll routes
    
    app.get('/polls/new', isAuthenticated, polls.newPoll);
    app.post('/polls/new', isAuthenticated, polls.create);
    app.get('/polls/:id', polls.show);
    app.post('/polls/:id/vote', polls.vote);
    app.get('/polls', polls.showAll);
    
}