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

let agent = chai.request.agent(server);


describe("Application Route Testing", () => {
    
    beforeEach((done) => {
       // poll = null;
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
                    loginUser();
                    
                    
                });
                
            });
            
            
        });
        
        function loginUser() {
            agent.post('/login')
                .send({username: 'testuser' , password: 'testpassword'})
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err,res) => {
                    if(err) throw err;
                    
                    done();
                    
                    
                });
        }
        
    });
   
    afterEach((done) => {
        
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
                    
                    res.should.redirect
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
                    //res.text.should.include('<form action="/signup" method="POST"');
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
    
    describe("GET /login", () =>{
        
        it('should respond with a status 200', (done)=>{
            
            chai.request(server)
                .get('/login')
                .end((err,res) => {
                    
                    should.not.exist(err);
                    
                    res.should.have.status(200);
                    
                    done();
                    
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
    
    describe("DELETE /logout", () => {
        
        it('is only routable if the user is signed in', (done)=>{
            
            chai.request(server)
                .delete('/logout')
                .end((err,res) =>{
                    
                    should.not.exist(err);
                    res.should.redirect;
                    //console.log(res);
                    //res.url.should.equal('/');
                    done();
                });
            
        });
        
        it('will logout the user', (done) => {
            
            agent.delete('/logout')
                .end((err,res) => {
                    
                    should.not.exist(err);
                    
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
                    res.text.should.contain(poll.question);

                    done();
                    
                });
            
        });
        
        it('should return an error for an invalid id', (done) => {
            
            chai.request(server)
                .get('/polls/' + 5)
                .end((err,res) => {
                    should.not.exist(err);
                    
                    res.should.have.status(200);
                    res.text.should.equal('Could not find poll');
                    done();
                    
                });
            
        });
        
    });
    
    describe('POST /users/exists', () =>{
        
        it('should return true if the user exists', (done) =>{
            
            chai.request(server)
                .post(`/users/exists`)
                .send({username: user.username})
                .set('content-type', 'application/json')
                .end((err,res) => {
                    
                    res.body.username.should.be.true;
                    
                    done();
                });
            
        });
        
        it('should return false if the user does not exist', (done) =>{
            
            chai.request(server)
                .post(`/users/exists`)
                .send({username: user.username + '123456'})
                .set('content-type', 'application/json')
                .end((err,res) => {
                    
                    //console.log(res);
                    res.body.username.should.be.false
                    
                    done();
                    
                });
            
        });
        
        
    });
    
    describe('GET /polls/new', () => {
        
        it('cannot be accessed by unauthenticated users', (done) => {
            
            chai.request(server)
                .get('/polls/new')
                .end((err,res) => {
                    
                    should.not.exist(err);
                    
                    res.should.have.status(200);
                    
                    res.should.redirect;
                    
                    done();
                    
                    
                });
            
        });
        
        it('can be accessed by authenticated users', (done) => {
            
            agent.get('/polls/new')
                .end((err,res) => {
                    
                    should.not.exist(err);
                    
                    res.should.have.status(200);
                    
                    res.should.be.html;
                    
                    done();
                    
                });
        });
        
    });
    
    describe("POST /polls/new", () => {
        
        it('cannot be accessed by unauthenticated users', (done) => {
            
            chai.request(server)
                .post('/polls/new')
                .send({question: 'Sample Question' , option1: 'option1', option2: 'option2'})
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err,res) => {
                    
                    should.not.exist(err);
                    
                    res.should.have.status(200);
                    
                    res.should.be.html;
                    
                    Poll.findOne({question: 'Sample Question'}, (err,poll) => {
                        
                        should.not.exist(poll);
                        
                        done();    
                        
                        
                    });
                    
                    
                    
                });
            
            
        });
        
        
        it('can be accessed by an authenticated user', (done) => {
            
            agent.post('/polls/new')
                .send({question: 'The Real Question', option1: 'Option1', option2: 'Option2'})
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err,res) => {
                    
                    should.not.exist(err);
                    //console.log(res);
                    Poll.findOne({question: 'The Real Question'}, (err,poll) => {
                        
                        should.not.exist(err);
                        
                        poll.should.exist;
                        done();
                        
                    });
                    
                    
                });
            
        });
        
    });
    
    
    describe("POST /polls/:id/vote", () => {
        
        it('Increases the vote option by 1', (done) => {
            
            
            poll.addOption('Test option', (err) => {
                
                //console.log(poll.options[0].votes);
                
                let votes = poll.options[0].votes;
                
                chai.request(server)
                    .post(`/polls/${poll._id}/vote`)
                    .send({radioOptions: 0})
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .end((err,res) => {
                       
                        should.not.exist(err);
                        
                        Poll.findById(poll._id, (err,data) =>{
                            
                            data.options[0].should.include({votes: votes+1 });
                            done();    
                            
                        });
                    });
            });
            
        });
        
        
        it('Adds a new option when specified',(done) => {
            
            agent.post(`/polls/${poll._id}/vote`)
                .send({radioOptions: 'addOption', newOption: 'Test Option 2'})
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err,res) => {
                    
                    should.not.exist(err);
                    
                    Poll.findById(poll._id, (err,data) => {
                       
                       should.not.exist(err);
                       //console.log(data.options);
                       data.options[0].should.contain({option: 'Test Option 2', votes: 1});
                       
                       done();
                        
                    });
                    
                });
            
        });
        
        
        it('only allows authenticated users to add new options', (done) => {
            
            chai.request(server)
                .post(`/polls/${poll._id}/vote`)
                .send({radioOptions: 'addOption', newOption: 'Test Option 3'})
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err,res) => {
                    
                    err.should.exist;
                    
                    done();
                    
                });
            
        });
        
        
        
    });
    
    
    
    
});