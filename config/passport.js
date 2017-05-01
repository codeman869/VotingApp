'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');


//const local = require('./passport/init');
const login = require('./passport/login');
const signup = require('./passport/signup');
const twitter = require('./passport/twitter');

module.exports = function(passport) {
    
    passport.serializeUser((user,done) => {
        done(null,user._id); 
    });

    passport.deserializeUser((id,done) => {
        User.findById(id, (err,usr) => {
            done(err,usr);
        });
});
    
    //passport.use(local);
    passport.use('login', login);
    passport.use('signup', signup);
    
    passport.use('twitter', twitter);
    
}