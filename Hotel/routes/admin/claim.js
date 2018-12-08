var express = require('express');
var claim = require('../../lib/claim')
var router = express.Router();

//TODO

//요청사항 생성
router.post('/', function(req, res, next) {
  claim.create(req.body, function(results){
      res.redirect('/admin/claim');
  });
});

//요청사항 수정
router.put('/', function(req, res, next) {
  claim.update(req.body, function(results){
      res.redirect('/admin/claim');
  });
});

//요청사항 삭제
router.delete('/', function(req, res, next) {
  claim.delete(req.body.claim_id, function(results){
      res.redirect('/admin/claim');
  });
});

//요청사항목록 가져오기
router.get('/', function(req, res, next) {
  claim.find.allJoin(function(results){
    res.render('manage/claim',{
        claims: results
    });
  });
});

module.exports = router;