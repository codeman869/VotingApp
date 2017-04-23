'use strict'
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');

const User = mongoose.model('User');
//let User = require('../models/user');

/*
function validPassword(user, password) {
    return bCrypt.compareSync(password,user.password);
}
*/
module.exports =  new LocalStrategy((username, password, done) => {
    
        User.findOne({username:username}, (err,usr) => {
           if(err) return done(err);
           
           if(!usr) return done(null,false);
           
           if(!usr.validPassword(password)) return done(null, false);
            
            //console.log('Successfully Signed in!');
            return done(null,usr);
        });   
        
        
});
    
