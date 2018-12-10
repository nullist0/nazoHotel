var express = require('express');
var facility = require("../../lib/facility.js");
var moment = require('moment');
var router = express.Router();

//TODO

//시설 목록 가져오기
router.get('/', function(req, res, next) {
  facility.find.join(function(results){
    res.render('manage/facil_list',{
      facilities: results,
      moment: moment
    });
  });
});

//시설 생성
router.post('/', function(req, res, next) {
  facility.create(req.body, function(results){
      res.redirect('/admin/facility');
  });
});

//시설 수정
router.put('/', function(req, res, next) {
  facility.update(req.body, function(results){
    res.redirect('/admin/facility');
  });
});

//시설 삭제
router.delete('/', function(req, res, next) {
  facility.delete(req.body.facility_id, function(results){
    res.redirect('/admin/facility');
  });
});

module.exports = router;