<<<<<<< HEAD
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
=======
//Now fully functional with Handlebars

var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var fs = require('fs');

//Setting up our working environment cont.
var app = express();
var port = process.env.PORT || 3000;
app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Code that actually listens and responds now:

app.get('/', function(req, res, next){
	if (process.env.CS_HBS) {
		res.status(200).render('mainPage', {loggedIn: 0});
	}
	else {
		res.status(200).sendFile(path.join(__dirname,'public','index.html'));
	}
});

app.get('*', function(req, res) {
	res.status(404).sendFile(path.join(__dirname,'public','404.txt'));
>>>>>>> server
});

app.listen(port, function () {
    console.log("== Server listening on port", port);
});
