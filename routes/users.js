'use strict'
const express = require('express');

let router = express.Router();

const User = require('../models/user');

router.post('/exists', (req,res) => {
    User.find({username: req.body.username}, (err,usr) =>{
        //console.log(err);
        if(err) return res.json(err);
        
        //console.log(req);
        //console.log(usr);
        
        if(!usr[0]) return res.json({username: false});
        
        res.json({username: true});
        
        
    });
    
});

module.exports = router;