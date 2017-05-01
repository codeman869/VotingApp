'use strict'
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

//let User = require('../models/user');
const User = mongoose.model('User');

module.exports = new LocalStrategy({
        passReqToCallback: true
    
    }, (req,username,password,done) => {
    
        function findOrCreate() {
            //console.log('finding user...');
            User.findOne({username: username, domain: 'local'}, (err,usr) => {
            if(err) console.warn(err);
            
            if(usr) return done(null,false);
           
            let newUser = new User();
           
            newUser.username = username;
            newUser.password = password;
            newUser.domain = 'local';
            newUser.save((err) => {
                if(err) console.warn(err);
                
                //console.log('Saved Successfully!');
                
                return done(null,newUser);
            });
           
            });
        }
    
        process.nextTick(findOrCreate);
    
});
