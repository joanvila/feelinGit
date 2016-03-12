var express = require('express');
var http = require('http');
var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');

var port = process.env.PORT || 8080;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

var commitsController = require('./app/routes/commits');
app.use('/', commitsController);

app.use(express.static('public'));

http.createServer(app).listen(port, function () {
  console.log('Listening on port ' + port);
});
