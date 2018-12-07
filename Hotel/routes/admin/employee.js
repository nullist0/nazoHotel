var express = require('express');
var employee = require("../../lib/employee.js");
var router = express.Router();

//직원 생성
router.post('/', function(req, res, next) {
    console.log(req.body);
    employee.create(req.body, function(results){
        res.redirect('/admin/employee/list');
    });
});

//직원 수정
router.put('/modify', function(req, res, next) {
    var data = Object.assign({
        employee_id: req.body.employee_id,
        first_name: null, 
        last_name: null, 
        department: null, 
        city: null, 
        street: null, 
        zip: null, 
        email: null,
        gender: null, 
        mobile_number: null,
        start_work: null, 
        salary: null, 
        responsible: null
    }, req.body);
    employee.update(data, function(results){
        res.redirect('/admin/employee/list');
    });
});

//직원 삭제
router.delete('/delete', function(req, res, next) {
    employee.delete(req.body.employee_id, function(results){
        res.redirect('/admin/employee/list');
    });
});

//TODO 직원 목록 가져오기
router.get('/list', function(req, res, next) {
    employee.find.all(function(results){
        res.render('manage/emp_list', {
            employees: results
        });
    });
});

//직원 휴가/출퇴근 정보 가져오기
router.get('/state', function(req, res, next) {
  employee.find.join(function(results){
    res.render('manage/emp_state', {
        states: results
    });
  });
});

//TODO 직원 state 정보 수정
router.put('/state/modify', function(req, res, next) {
    employee.update(req.body, function(results){
        res.redirect('/admin/employee/state');
    });
});

module.exports = router;