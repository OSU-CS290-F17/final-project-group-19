//Now fully functional with Handlebars

var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var fs = require('fs');

//Mongo DB specific things
var MongoClient = require('mongodb').MongoClient;
var mongoHost = 'classmongo.engr.oregonstate.edu';//process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = 'cs290_okonekp';//process.env.MONGO_USER;
var mongoPassword = 'cs290_okonekp';//process.env.MONGO_PASSWORD;
var mongoDBName = 'cs290_okonekp';//process.env.MONGO_DB;

var mongoURL = 'mongodb://'+mongoUser+':'+mongoPassword+'@'+mongoHost+':'+mongoPort+'/'+mongoDBName;

//Setting up our working environment cont.
var app = express();
var port = process.env.PORT || 3000;

//local .json character data for testing
var characterData = require('./characterData.json');
//local .json news data for testing
var newsData = require('./newsData.json');

var mongoDBDatabase;

app.use(express.static('public'));

// Change (chris): added the main.hbs as a default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Code that actually listens and responds now:

app.get('/', function(req, res, next){
	var newsCollection = mongoDBDatabase.collection('newsCards');

	newsCollection.find({}).toArray(function (err, results) {
		console.log(results);
		res.status(200).render('mainPage', {loggedIn: 0, newsData: results});
	});


});

app.get('*', function(req, res) {
	res.status(404).render('404',{loggedIn: 404});
});

MongoClient.connect(mongoURL, function (err, db) {
	if (err) {
		throw err;
	}
	mongoDBDatabase = db;
	
	app.listen(port, function () {
	    console.log("== Server listening on port", port);

});
	var mongoNews = db.collection('characterData');
	for ( var i = 0; i < newsData.length; i++) {
		db.collection('characterData').insert(characterData, function(err, records) {
			if (err) throw err;
		})
	}
});
