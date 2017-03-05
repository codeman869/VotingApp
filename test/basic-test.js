//var request = require('request');
'use strict'
let server = require('../server');
let base_uri = `http://localhost:${process.env.PORT}`;
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let User = require('../models/user');
let Poll = require('../models/poll');


chai.use(chaiHttp);

let user, poll;


describe("Application Route Testing", () => {
    
    before((done) => {
        
        User.remove({}, ()=> {
            
            user = new User();
            
            user.username = 'testuser';
            user.password = 'testpassword';
            
            user.save((err) => {
                if(err) throw err;
                poll = new Poll();
                poll.question = 'test question';
                poll.owner_id = user._id;
                
                poll.save((err) => {
                    if(err) throw err;
                    
                    done();
                    
                });
                
            });
            
            
        });
        
        
        
    });
   
    after((done) => {
        
        User.remove({},()=>{
            
            Poll.remove({}, () => {
                
                done();
            });
        });
        
    });
   
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
    
    describe("GET /polls", () => {
        it('should be routable', (done) =>{
            
            chai.request(server)
                .get('/polls')
                .end((err,res) => {
                    
                    should.not.exist(err);
                    res.should.have.status(200);
                    done();
                });
            
        });
    });
    
    describe("GET /polls/:id", () => {
        it('should show a particular poll', (done) =>{
            
            chai.request(server)
                .get('/polls/' + poll.id)
                .end((err,res) => {
                    
                    should.not.exist(err);
                    
                    res.should.have.status(200);
                    res.body._id.should.equal(poll.id);
                    res.body.question.should.equal(poll.question);
                    done();
                    
                });
            
        });
        
    });
    
});