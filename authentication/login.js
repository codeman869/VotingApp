'use strict'
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');

let User = require('../models/user');


function validPassword(user, password) {
    return bCrypt.compareSync(password,user.password);
}

module.exports = function(passport) {
    passport.use('login',
    new LocalStrategy((username, password, done) => {
    
        User.findOne({username:username}, (err,usr) => {
           if(err) return done(err);
           
           if(!usr) return done(null,false);
           
           if(!validPassword(usr,password)) return done(null, false);
            
            console.log('Successfully Signed in!');
            return done(null,usr);
        });   
        
        
    }));
    
}