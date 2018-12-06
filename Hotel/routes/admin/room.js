var express = require('express');
var room = require('../../lib/room.js')
var router = express.Router();

//TODO 방목록 가져오기
router.get('/monitoring', function(req, res, next) {
  room.find.all(function(results){
    //todo
  });
});

module.exports = router;