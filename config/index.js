'use strict'
const path = require('path');

exports.root = path.join(__dirname, '..');
exports.twitterAPI = process.env.twitterAPI;
exports.twitterSecret = process.env.twitterSecret;
exports.twitterCB = process.env.twitterCB;

