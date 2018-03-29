var express = require('express');
var router = express.Router();
var queries = require('../db/queries');



router.get('/', function(req, res, next) {
    res.render('commentaires', { title: 'Express' });
});



module.exports = router;
