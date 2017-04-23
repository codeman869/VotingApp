'use strict'
const mongoose = require('mongoose');
let User = require('../app/models/user');
let chai = require('chai');
let should = chai.should();

describe("User Model Tests", () =>{
    
    before((done) => {
        User.remove({}, (err) => {
            
            if(err) throw err;
            
            let newUser = new User();
            newUser.username = 'testuser';
            newUser.password = 'testpassword';
            
            newUser.save((err)=>{
                
                if(err) throw err;
                
                done();
                
            });
            
            
        });
        
    });
    
    after((done) => {
        
        User.remove({},(err) =>{
            if(err) throw err;
            
            done();
            
        });
        
    });
    
    
    describe("Saving a user", () => {
        
        it('does not save plaintext passwords to database', (done) =>{
            
            let newUser = new User();
            let password = 'testpassword'
            newUser.username = 'testuser2';
            newUser.password = password;
            
            newUser.save((err) =>{
                if(err) throw err;
                
                newUser.password.should.not.equal(password);
                
                done();
                
            });
            
        });
        
    });
    
    describe("Validating a user", () => {
        
        it('should validate a password on the model', (done) => {
            
            User.findOne({username:'testuser'}, (err,usr) => {
                
                should.not.exist(err);
                
                should.exist(usr);
                
                usr.validPassword('testpassword').should.be.true;
                
                done();
                
            });
            
            
        });
        
        it('should not allow two of the same username', (done)=>{
            
            let newUser = new User();
            
            newUser.username = 'testuser';
            newUser.password = 'testpassword';
            
            newUser.save((err) => {
                
                should.exist(err);
                
                done();
                
            });
            
        });
        
    });
    
});