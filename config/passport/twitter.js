'use strict'
const TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose');
const config = require('../');

const User = mongoose.model('User');

module.exports = new TwitterStrategy({
    
    consumerKey: config.twitterAPI,
    consumerSecret: config.twitterSecret, 
    callbackURL: config.twitterCB
    
    }, function(token, tokenSecret, profile, done){
        
        console.log(profile);
        
        User.findOrCreate(profile.username, (err,user) => {
        
            if(err) return done(err);
            
            return done(null,user);
            
            
        });
        
        
        
    });
    
    