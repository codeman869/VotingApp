'use strict'
let request = require('request');
const server = require('../server');
const base_uri = `http://localhost:${process.env.PORT}`;

describe("Basic Voting App Tests", () => {
   
   describe("GET /", () => {
       it("returns status code 200", (done) => {
          
          request.get(base_uri, (err,res,body) => {
             if(err) throw err;
             //console.log(res);
             expect(res.statusCode).toBe(200);
             server.closeServer();
             done();
             
             
          });
           
       });
   });
});