//var request = require('request');
'use strict'
let server = require('../server');
let base_uri = `http://localhost:${process.env.PORT}`;
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let User = require('../models/user');


chai.use(chaiHttp);

describe("Basic Voting App Tests", () => {
    
    before((done) => {
        
        User.remove({}, ()=> {
            
            let newUser = new User();
            
            newUser.username = 'testuser';
            newUser.password = 'testpassword';
            
            newUser.save((err) => {
                if(err) throw err;
                
                done();
                
            });
            
            
        });
        
        
        
    });
    /*
    after((done) => {
        
        User.remove({},()=>{
            
            done();
        });
        
    });
   */
   describe("GET /", () => {
       it("returns status code 200", (done) => {
          
          chai.request(server)
            .get('/')
            .end((err,res) => {
                if(err) throw err;
                res.should.have.status(200);
                done();
                
            });
             
             
             
        });
           
    });
    
    describe("GET /home", () => {
        
        it("redirects to / for unauthenticated user", (done)=>{
            
            chai.request(server)
                .get('/home')
                .end((err,res) => {
                    if(err) throw err;
                    
                    should.not.exist(err);
                    
                    res.should.have.status(200);
                    
                    res.should.be.html;
                    
                    //console.log(res.path);
                    
                    done();
                });
            
        });
        
    });
    
    
    describe("GET /signup", () => {
        
        it('returns the signup page', (done) => {
            
            chai.request(server)
                .get('/signup')
                .end((err,res) => {
                    
                    should.not.exist(err);
                    
                    res.should.have.status(200);
                    res.should.be.html;
                    res.text.should.include('<form action="/signup" method="POST"');
                    //console.log(res.text);
                    
                    done();
                });
            
        });
        
    });
    
    describe("POST /signup", ()=>{
        
        it('Creates a new user', (done)=>{
            
            chai.request(server)
                .post('/signup')
                .send({username: 'fredflinstone', password: 'testpassword'})
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err,res) => {
                    
                    should.not.exist(err);
                    
                    res.should.have.status(200);
                    //console.log(res);
                    User.findOne({username:'fredflinstone'}, (err,usr)=>{
                        
                        should.exist(usr);
                    
                        usr.username.should.be.equal('fredflinstone');
                        
                        should.exist(usr.password);
                    
                        done();
    
                        
                    });
                    
                                        
                });
            
        });
        
    });
    
    
    describe("POST /login", () => {
        
        it('allows a user to login', (done)=>{
            
            chai.request(server)
                .post('/login')
                .send({username: 'testuser' , password: 'testpassword'})
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err,res) => {
                    
                    should.not.exist(err);
                    
                    res.should.have.status(200);
                    res.should.be.html;
                    done();        
                });
            
        });
        
    });
    
});