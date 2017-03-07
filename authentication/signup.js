'use strict'
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');

let User = require('../models/user');
module.exports = function(passport) {
    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    
    }, (req,username,password,done) => {
    
        function findOrCreate() {
            //console.log('finding user...');
            User.findOne({username: username}, (err,usr) => {
            if(err) console.warn(err);
            
            if(usr) return done(null,false);
           
            let newUser = new User();
           
            newUser.username = username;
            newUser.password = password;
           
            newUser.save((err) => {
                if(err) console.warn(err);
                
                //console.log('Saved Successfully!');
                
                return done(null,newUser);
            });
           
            });
        }
    
        process.nextTick(findOrCreate);
    
    }));
}
