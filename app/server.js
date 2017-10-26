'use strict';

// simple express server
let express = require('express');
let app = express();
let router = express.Router();

app.use(express.static('app/client'));
app.get('/', function(req, res) {
    res.sendfile('./app/client/index.html');
});

app.listen(5000);