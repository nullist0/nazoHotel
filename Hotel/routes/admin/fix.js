var express = require('express');
var fix = require("../../lib/fix.js");
var router = express.Router();
var moment = require('moment');

//TODO

//시설수리 목록 가져오기
router.get('/', function(req, res, next) {
  fix.find.joinEmployee(function(results){
    res.render('manage/facil_fix', {
      fixes: results,
      moment: moment
    });
  });
});

//시설수리 삭제
router.delete('/', function(req, res, next) {
  fix.delete(req.body.fix_id, function(results){
      res.redirect('/admin/facility/fixlist');
  });
});

//시설수리 생성
router.post('/', function(req, res, next) {
  fix.create(req.body, function(results){
      res.redirect('/admin/facility/fixlist');
  });
});

//시설수리 수정
router.put('/', function(req, res, next) {
  if (!isNaN(parseInt(req.body.facility_id, 10))) {
    req.body.facility_id = parseInt(req.body.facility_id);
  }

  if (!isNaN(parseInt(req.body.employee_id, 10))) {
    req.body.employee_id = parseInt(req.body.employee_id);
  }

  if (!isNaN(parseInt(req.body.fix_id, 10))) {
    req.body.fix_id = parseInt(req.body.fix_id);
  }
  fix.update(req.body, function(results){
    res.redirect('/admin/facility/fixlist');
  });
});

module.exports = router;