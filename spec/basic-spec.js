'use strict'
const request = require('request');
const server = require('../server');

describe("Basic Voting App Tests", () => {
   
   describe("GET /", () => {
       it("returns status code 200", () => {
          
          request.get(`http://localhost:${process.env.PORT}`, (err,res,body) => {
             if(err) throw err;
             
             expect(res.statusCode).toBe(200);
             done();
             server.closeServer();
             
          });
           
       });
   }); 
    
});