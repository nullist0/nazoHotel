var express = require('express');
var facility = require("../../lib/facility.js");
var router = express.Router();

//TODO

//시설 목록 가져오기
router.get('/', function(req, res, next) {
  facility.find.all(function(results){
    res.render('manage/facil_list',{
      facilities: results
    });
  });
});

//시설 생성
router.post('/', function(req, res, next) {
  facility.create(req.body.floor, req.body.type, req.body.m_staff, req.body.s_staff, function(results){
      res.redirect('/admin/facility/list');
  });
});

//시설 수정
router.put('/', function(req, res, next) {
  facility.update(req.body, function(results){
    res.redirect('/admin/facility/list');
  });
});

//시설 삭제
router.delete('/', function(req, res, next) {
  facility.delete(req.params.id, function(results){
    res.redirect('/admin/facility/list');
  });
});

module.exports = router;