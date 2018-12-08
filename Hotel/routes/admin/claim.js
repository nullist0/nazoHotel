var express = require('express');
var moment = require('moment')
var claim = require('../../lib/claim')
var take = require('../../lib/take')
var router = express.Router();

//TODO
  
//요청사항 생성
router.post('/', function(req, res, next) {
  var mdeadline = moment(req.body.deadline + ' ' +req.body.deadline_time, 'YYYY-MM-DD hh:mm');
  req.body.deadline = mdeadline.toDate();
  claim.create(req.body, function(results){
      res.redirect('/admin/claim');
  });
});

//요청사항 수정
router.put('/', function(req, res, next) {
  var mdeadline = moment(req.body.deadline + ' ' +req.body.deadline_time, 'YYYY-MM-DD hh:mm');
  req.body.deadline = mdeadline.toDate();
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
        claims: results,
        moment: moment
    });
  });
});

router.post('/take', function(req, res, next) {
  take.assign(req.body.claim_id, req.body.employee_id, function(results){
      res.redirect('/admin/claim');
  });
});

router.put('/take', function(req, res, next) {
  take.finish(req.body.claim_id, function(results){
      res.redirect('/admin/claim');
  });
});

module.exports = router;