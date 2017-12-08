//Now fully functional with Handlebars
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

//Mongo DB specific things
var MongoClient = require('mongodb').MongoClient;
var mongoHost = 'classmongo.engr.oregonstate.edu';//process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = 'cs290_okonekp';//process.env.MONGO_USER;
var mongoPassword = 'cs290_okonekp';//process.env.MONGO_PASSWORD;
var mongoDBName = 'cs290_okonekp';//process.env.MONGO_DB;

var mongoURL = 'mongodb://'+mongoUser+':'+mongoPassword+'@'+mongoHost+':'+mongoPort+'/'+mongoDBName;

var app = express();
var port = process.env.PORT || 3000;
var characterData = require('./characterData.json');
var userData = require('./userData.json');

app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.get('/', function(req, res, next){
	var newsCollection = mongoDBDatabase.collection('newsCards');

	newsCollection.find({}).toArray(function (err, results) {
		res.status(200).render('mainPage', {
        loggedId: 0,
        newsData: results
    	});
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

MongoClient.connect(mongoURL, function (err, db) {
	if (err) {
		throw err;
	}
	mongoDBDatabase = db;
	
	app.listen(port, function () {
	    console.log("== Server listening on port", port);
	});
});
