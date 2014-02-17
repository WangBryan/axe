var parser  = require('./lib/parser');
var http    = require('http');
var express = require('express');

var app = express();
var content = '';

http.get('http://axe-level-1.herokuapp.com/', function (res) {
    console.log('Get response', res.statusCode);

    res.on('data', function (chunk) {
        content += chunk;
    });

    res.on('end', function () {
        // console.log(content);
        parser.run(content);
    })
}).on('error', function (err) {
    console.log(err);
});

app.get('/api/result', function (req, res) {
    parser.getResult(function (result) {
        res.send(result);
    });
});

app.listen('5000');
