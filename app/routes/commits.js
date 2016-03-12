var commitsController = require('express').Router();

commitsController.get('/', function (req, res, next) {
    res.status(200).send('Hello World!');
});

module.exports = commitsController;
