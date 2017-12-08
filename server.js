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

var mongoDBDatabase = null;
var mongoURL = 'mongodb://'+mongoUser+':'+mongoPassword+'@'+mongoHost+':'+mongoPort+'/'+mongoDBName;

var app = express();
var port = process.env.PORT || 3000;
var characterData;
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

	var charCollection = mongoDBDatabase.collection('characterData');

	charCollection.find({}).toArray(function (err, results) {
		characterData = results;


		
		if(userData.name === username && userData.password === password){
			    res.status(200).render('accountpage', {
			    characterData: characterData,
				loggedIn: 1
			});
    }
    else {
        next();
    }
	});
});

app.get('*', function (req, res) {
    res.status(404).render('404');
});

app.post('/:username/:password', function (req, res, next) {
	if (req.body) {
		var charCollection = mongoDBDatabase.collection('characterData');
		var newChar = {
			"name": req.body.name,
			"race": req.body.race,
			"classtype": req.body.classtype,
			"strength": req.body.strength,
			"dexterity": req.body.dexterity,
			"consitution": req.body.constitution,
			"intelegence": req.body.intelegence,
			"wisdom": req.body.wisdom,
			"charisma": req.body.charisma,
		};

		if (0) {
		charCollection.updateOne(
		
			{$push: newChar },
			function (err, result) {
				if (err) {
					res.status(500).send("Error fetching data");
				} else {
					res.status(200).send("Success!");
				}
			}
		);
		}
		else {
			charCollection.insert(newChar);
			res.status(200).send("Success!");
		}
	} else {
		res.status(400).send("Request needs some more info or is broken, I don't know");
	}
});

// app.post('/:username/addCharacter', function(req, res, next){
//     if(req.body && req.body.name){
//         console.log("==client added the character" + req.body.name);

//         res.status(200).send("Character succesfuly added");
//     }
//     else {
//         res.status(400).send("Requests to this path must " +
//                              "contain a JSON body with a name field");
//     }
// });

app.post('*', function(req, res) {
	res.status(404).send("POST to unknown path");
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
