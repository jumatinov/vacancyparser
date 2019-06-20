var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
//cors library for cross requests from client to server

var parseRoute = require('./route/parseRoute');

app.use('/', parseRoute);
app.use(bodyParser());
app.use(cors());

//app.use(function (req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
//})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});



