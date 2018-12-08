var express = require('express');
var facility = require("../../lib/facility.js");
var fix = require("../../lib/fix.js");
var employee = require("../../lib/employee.js");
var router = express.Router();

//TODO

//시설수리 목록 가져오기
router.get('/', function(req, res, next) {
  fix.find.joinEmployee(function(results){
    res.render('manage/facil_fix', {
      fixes: results
    });
  });
});

//시설 생성
router.post('/', function(req, res, next) {
  facility.create(req.body.floor, req.body.type, req.body.m_staff, req.body.s_staff, function(results){
      res.redirect('/admin/facility/list');
  });
});

//시설수리 수정
router.put('/', function(req, res, next) {
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