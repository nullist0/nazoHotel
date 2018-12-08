var express = require('express');
var option_kind = require('../../lib/option_kind');
var router = express.Router();

//옵션 생성
router.post('/', function(req, res, next) {
  option_kind.create(req.body, function(results){
      res.redirect('/admin/option');
  });
});

//옵션 수정
router.put('/', function(req, res, next) {
  option_kind.update(req.body, function(results){
      res.redirect('/admin/option');
  });
});

//옵션 삭제
router.delete('/', function(req, res, next) {
  option_kind.delete(req.body.option_name, function(results){
      res.redirect('/admin/option');
  });
});

//옵션 가져오기
router.get('/', function(req, res, next) {
  option_kind.find.all(function(results){
    res.render('manage/option_list',{
        options: results
    });
  });
});

module.exports = router;