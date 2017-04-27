'use strict'
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const expressSession = require('express-session');
const config = require('./');

/**
 * Expose
 */

module.exports = function(app,passport) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    
    app.use(expressSession({
        secret: process.env.SECRET || 'testsecret'
    }))
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    
    app.set('views', path.join(config.root, 'app', 'views'));
    app.set('view engine', 'pug');
    
    app.use('/bootstrap', express.static(path.join(config.root, 'node_modules', 'bootstrap', 'dist' )));
    app.use('/jquery', express.static(path.join(config.root, 'node_modules', 'jquery', 'dist')));
    app.use('/scripts', express.static(path.join(config.root, 'public', 'scripts')))
    app.use('/chartJS', express.static(path.join(config.root, 'node_modules', 'chart.js', 'dist')));
    app.use('/css', express.static(path.join(config.root, 'public', 'css')));
    
}