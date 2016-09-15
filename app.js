var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	config = require('./config');

var app = express();

/* Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/* Load routes */
require('./app/routes/auth')(app);
require('./app/routes/user')(app);
require('./app/routes/match')(app);


/* Database */
mongoose.connect(config.database);
mongoose.connection.on('connected', function () {
	console.log("Connected");
});
mongoose.connection.on('error', function (err) {
	console.log("Connection error: " + err);
});
mongoose.connection.on('disconnected', function () {
	console.log("MongoDB disconnected");
});

/* Test route. */
app.get('/', function(req, res) {
	res.send('working...');
})

var port = process.env.PORT || 9999;

app.listen(port, function() {
	console.log('Server listening on port ' + port);
})

module.exports = app;