'use strict';

// simple express server
var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static('app/client'));
app.get('/', function(req, res) {
    res.sendfile('./app/client/index.html');
});

app.listen(5000);