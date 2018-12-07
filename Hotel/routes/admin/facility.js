var express = require('express');
var facility = require("../../lib/facility.js");
var fix = require("../../lib/fix.js");
var router = express.Router();

//시설 목록 가져오기
router.get('/list', function(req, res, next) {
  // facility.find.all(function(results){
        console.log("hi");
      res.render('manage/facil_list');
      // ,{
      //   facilities: results
      // });
  // });
});

//시설수리 목록 가져오기
router.get('/fixlist', function(req, res, next) {
  fix.find.all(function(results){
    res.render('manage/facil_fix');
  });
});

//시설 생성
router.post('/', function(req, res, next) {
  facility.create(req.body.floor, req.body.type, req.body.m_staff, req.body.s_staff, function(results){
      res.redirect('/admin/facility/list');
  });
});

//시설 수정
router.put('/modify', function(req, res, next) {
    all = {
        facility_id: req.params.id,
        floor: req.body.floor, 
        type: req.body.type, 
        m_staff: req.body.m_staff,
        s_staff: req.body.s_staff
    };
  facility.update(all, function(results){
    res.redirect('/admin/facility/list');
  });
});

//시설 삭제
router.delete('/delete', function(req, res, next) {
  facility.delete(req.params.id, function(results){
    res.redirect('/admin/facility/list');
  });
});

//시설수리 수정
router.put('/fixlist/modify', function(req, res, next) {
    all = {
        facility_id: req.params.id,
        floor: req.body.floor, 
        type: req.body.type, 
        m_staff: req.body.m_staff,
        s_staff: req.body.s_staff
    };
  fix.update(all, function(results){
    res.redirect('/admin/facility/list');
  });
});

module.exports = router;