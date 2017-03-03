//var request = require('request');
'use strict'
let server = require('../server');
let base_uri = `http://localhost:${process.env.PORT}`;
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe("Basic Voting App Tests", () => {
   
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
   });