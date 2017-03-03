'use strict'
let mongoose = require('mongoose');
let Poll = require('./models/poll');


mongoose.connect('mongodb://localhost:27017/test');

let newPoll = new Poll();
/*
newPoll.question = "This is a question";
newPoll.options.push({option: 'Answer 1', votes: 0})

newPoll.options.push({option: 'Answer 2', votes: 0});

newPoll.owner_id = "58b9c7036a2cc616b2b932e5";
*/



newPoll.validate((err) => {
    
    console.log("err is ");
    console.log(err);
    
});


