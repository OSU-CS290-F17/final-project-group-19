//Now fully functional with Handlebars
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;
var characterData = require('./characterData.json');
var userData = require('./userData.json');
var newsData = require('./newsData.json');

app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.get('/', function(req, res, next){
		res.status(200).render('mainPage', {
        loggedId: 0,
        newsData: newsData
    });
});

app.get('/:username/:password', function(req, res, next){
    var username = req.params.username;
    var password = req.params.password;
    if(userData.name === username && userData.password === password){
		    res.status(200).render('accountpage', {
            characterData: characterData
        });
    }
    else {
        next();
    }
});

app.get('*', function (req, res) {
    res.status(404).render('404');
});

app.listen(port, function () {
    console.log("== Server listening on port", port);
});
