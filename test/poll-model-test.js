'use strict'
let chai = require('chai');
let should = chai.should();
let mongoose = require("mongoose");
let Poll = require("../models/poll");
let User = require("../models/user");

let pollId = '';

describe("Poll Model Spec", ()=>{
    
    before((done)=>{
        
        let newUser = new User();
        
        newUser.username = 'testuser';
        newUser.password = 'testpassword';
        
        newUser.save((err) => {
            
            if(err) throw err;
            
            removePolls();
            
        });
        
        function removePolls() {
            Poll.remove({}, (err) =>{
                if(err) throw err;
            
                let newPoll = new Poll();
            
                newPoll.owner_id = newUser._id;
                newPoll.question = 'This is a basic question'
                newPoll.options.push({option: 'This is the first option', votes: 527});
                newPoll.options.push({option: 'This is the 2nd option', votes: 312});
            
                newPoll.save((err) => {
                    if(err) throw err;
                
                    pollId = newPoll._id;
                    //console.log(`Poll ID is ${pollId}`);
                    
                    done();    
                
                });
            
            
            
            });
            
        }
        
    });
    
    
    describe("Create a new Poll", () =>{
        
        it('should have a question', (done)=>{
            
            let newPoll = new Poll();
            
            newPoll.owner_id = new mongoose.Schema.Types.ObjectId;
            
            newPoll.validate((err) => {
                
                should.exist(err);
                done();
                
            });
            
        });
        
        it('should have an owner_id', (done) =>{
            
            let newPoll = new Poll();
            
            newPoll.question = 'This is a question';
            
            newPoll.validate((err)=>{
                
                should.exist(err);
                
                done();
                
            });
            
        });
        
        it('can be saved with both an owner_id and a question',(done) =>{
            let newPoll = new Poll();
            
            newPoll.question = 'This is a new question';
            
            newPoll.owner_id = '58b9e33db4da1b18d752ed30'
            
            newPoll.save((err) => {

                should.not.exist(err);
                
                done();
            });
            
            
        });
        
        
    });
    
    
    describe("Modify the Polls", () =>{
        
        it('options can be added to a saved Poll', (done)=>{
            
            
            Poll.findById(pollId,(err, poll) =>{
                
                if(err) throw err;
                
                let originalLength = poll.options.length;
                
                
                poll.addOption('Option 3', (err) => {
                    
                    should.not.exist(err);

                    poll.options.length.should.equal(originalLength + 1);
                    
                    done();    
                    
                });
                
                

            });
            
            
            
            
        });
        
        it('options can be voted for', (done) =>{
            
            Poll.findById(pollId, (err, poll) => {
                if(err) throw err;
                
                let numVotes = poll.options[1].votes;
                
                poll.voteFor(1, (err) => {
                    
                    if(err) throw err;
                    
                    poll.options[1].votes.should.be.equal(numVotes + 1);
                    
                    done();
                });
                
            });
            
        });
        
        it('can show the associated user', (done) =>{
            
            Poll.findById(pollId, (err,poll) => {
                if(err) throw err;
                
                poll.getOwner((err,user)=>{
                    
                    should.not.exist(err);
                    
                    user.username.should.be.equal('testuser');
                    done();
                    
                });
                
            });
            
        });
        
        it('returns an error when voting for a non valid option',(done) => {
            
            Poll.findById(pollId, (err,poll) => {
                
                let bounds = poll.options.length;
                
                poll.voteFor(bounds+1, (err,data)=>{
                    
                    should.exist(err);
                    done();
                    
                });
                
            });
            
        });
        
    });
    
});