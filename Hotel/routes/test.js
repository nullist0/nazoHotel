var express = require('express');
var router = express.Router();

var claim = require(`../lib/claim`);

/* GET home page. */
router.get('/claim', function(req, res, next) {
  claim.get(1, function(results){
    console.log(results);
  });
  res.end("Success");
  // res.render('index', { title: 'Express' });
});

module.exports = router;