var express = require('express');
var employee = require("../../lib/employee.js");
var router = express.Router();

//직원 휴가/출퇴근 정보 가져오기
router.get('/', function(req, res, next) {
  employee.find.join(function(results){
    res.render('manage/emp_state', {
        states: results
    });
  });
});

//직원 state 정보 수정
router.put('/', function(req, res, next) {
    employee.update(req.body, function(results){
        res.redirect('/admin/employee/state');
    });
});

module.exports = router;