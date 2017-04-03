'use strict'
const mongoose = require('mongoose');
let User = require("./user");

let PollSchema = new mongoose.Schema({
    
    question: {type: String, required: true},
    options: [
        {
            option: String,
            votes: Number
        }
    ],
    owner_id: {type: mongoose.Schema.Types.ObjectId, required: true}
    
}, {
    timestamps: true
});


PollSchema.methods.addOption = function(option,cb) {
    
    let newOption = {
        option: option,
        votes: 0
    }
    
    this.options.push(newOption);
    
    this.save((err) => {
        
        if(err) return cb(err);
        
        cb(null);
        
    });
    
    
};


PollSchema.methods.voteFor = function(option, cb) {
    
    if(isNaN(Number(option))) return cb(new Error("Option must be a number!"));
    
    if(option < 0 || option >= this.options.length ) return cb(new Error('Option out of range'));
    
    this.options[option].votes += 1;
    
    this.save((err) =>{
        
        if(err) return cb(err);
        
        cb(null);
        
    });
    
    
    
}

PollSchema.methods.getOwner = function(cb) {
    
    User.findById(this.owner_id, (err,user) => {
        if(err) return cb(err);
        
        cb(null,user);
        
        
    });
    
}

let Poll = mongoose.model('Poll', PollSchema);

module.exports = Poll;