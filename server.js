var express = require('express');
var http = require('http');
var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');

var port = process.env.PORT || 8080;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//var commitsController = require('./app/routes/commits');
//app.use('/', commitsController);

app.get('/', function(req, res, next) {
  //Path to your main file
  res.status(200).sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/env', function(req, res, next) {
  res.status(200).send(process.env.ACCESS_TOKEN);
});

app.use(express.static('public'));

http.createServer(app).listen(port, function () {
  console.log('Listening on port ' + port);
});
