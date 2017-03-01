'use strict'
const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema(
    {
        username: {
            type: String, 
            unique: true
        },
        hashed_password: String
    },
    {
        timestamps: true
    });
    

let User = mongoose.model('User', UserSchema);

module.exports = User;