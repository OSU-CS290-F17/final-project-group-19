//Not functional yet

var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res, next){
    fs.readFile('index.html', function(err,data){
        if (err){throw err;}
        else {
            res.status(200).send(data);
        }
    });
});

app.listen(port, function () {
    console.log("== Server listening on port", port);
});
