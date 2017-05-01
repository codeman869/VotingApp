'use strict'
const mongoose = require('mongoose');
const bCrypt = require('bcrypt-nodejs');

let UserSchema = new mongoose.Schema(
    {
        username: {
            type: String, 
            unique: true
        },
        password: String
    },
    {
        timestamps: true
    });
    
UserSchema.pre('save', function(next) {
    var user = this;
    //console.log(this);
    if(!user.isModified('password')) return next();
    
    let hashed_password = createHash(this.password);
    
    this.password = hashed_password;
    //console.log(`new password should be ${hashed_password}`)
    //console.log(`this.password is: ${this.password}`);
    
    next();
    
});

UserSchema.statics.findOrCreate = function(userid, done) {
    
    this.findOne({username:userid}, function(err,user){
        if(err) return done(err);
        
        if(user) return done(null,user);
        
        let newUser = new User();
        
        newUser.username = userid;
        
        newUser.save((err)=>{
            if(err) return done(err);
            done(null,newUser);
            
        });
        
        
        
    });
}

UserSchema.methods.validPassword = function(password) {
    return validPassword(password, this.password);
}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10),null);
}

function validPassword(clear_password, hashed_password) {
    return bCrypt.compareSync(clear_password,hashed_password);
}

let User = mongoose.model('User', UserSchema);

module.exports = User;