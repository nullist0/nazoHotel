var express = require('express');
var room = require('../../lib/room.js');
var router = express.Router();

//방 생성
router.post('/', function(req, res, next) {
  req.body.is_checkout = req.body.is_checkout == 'O' ? true : false;
  req.body.is_clean = req.body.is_clean == 'O' ? true : false;
  room.create(req.body, function(results){
      res.redirect('/admin/room');
  });
});

//방 수정
router.put('/', function(req, res, next) {
  if(req.body.is_checkout != null)
    req.body.is_checkout = req.body.is_checkout == 'O' ? true : false;
  if(req.body.is_clean != null)
    req.body.is_clean = req.body.is_clean == 'O' ? true : false;
  req.body.room_id = parseInt(req.body.room_id);
  room.update(req.body, function(results){
      res.redirect('/admin/room');
  });
});

//방 삭제
router.delete('/', function(req, res, next) {
  room.delete(req.body.room_id, function(results){
      res.redirect('/admin/room');
  });
});

//방목록 가져오기
router.get('/', function(req, res, next) {
  room.find.all(function(results){
    res.render('manage/room_list',{
        rooms: results
    });
  });
});

module.exports = router;