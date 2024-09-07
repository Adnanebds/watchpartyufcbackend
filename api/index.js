const serverless = require('serverless-http');
const express = require('express');
const app = require('./server'); // Import your existing server file

module.exports.handler = serverless(app);
