var express = require('express');
var claim = require('../../lib/claim')
var router = express.Router();

//TODO 요청사항목록 가져오기
router.get('/', function(req, res, next) {
  claim.find.all(function(results){
    //TODO
  });
});

module.exports = router;