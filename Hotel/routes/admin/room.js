var express = require('express');
var room = require('../../lib/room.js');
var option_kind = require('../../lib/option_kind');
var router = express.Router();

//TODO 방목록 가져오기
router.get('/monitoring', function(req, res, next) {
  room.find.all(function(results){
    res.render('manage/room_list',{
        rooms: results
    });
  });
});

//옵션 가져오기
router.get('/option', function(req, res, next) {
  option_kind.find.all(function(results){
    res.render('manage/option_list',{
        options: results
    });
  });
});

module.exports = router;