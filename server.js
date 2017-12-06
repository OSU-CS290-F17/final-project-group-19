//Now fully functional with Handlebars

var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var fs = require('fs');

//Setting up our working environment cont.
var app = express();
var port = process.env.PORT || 3000;

//local .json character data for testing
var characterData = require('./characterData.json');

app.use(express.static('public'));

// Change (chris): added the main.hbs as a default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Code that actually listens and responds now:

app.get('/', function(req, res, next){
	if (process.env.CS_HBS || 1) {
		res.status(200).render('mainPage', {loggedIn: 0});
	}
	else {
		res.status(200).sendFile(path.join(__dirname,'public','index.html'));
	}
});

app.get('*', function(req, res) {
	res.status(404).sendFile(path.join(__dirname,'public','404.txt'));
});

app.listen(port, function () {
    console.log("== Server listening on port", port);
});
