//Not functional yet

var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

app.get('/', function(req, res, next){
    fs.readFile('index.html', function(err,data){
        if (err){throw err;}
        else {
            res.status(200).send(data);
        }
    });
});

app.listen(8000, function () {
    console.log("== Server listening on port 8000");
});
