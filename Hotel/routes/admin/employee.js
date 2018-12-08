var express = require('express');
var employee = require("../../lib/employee.js");
var router = express.Router();

//직원 생성
router.post('/', function(req, res, next) {
    employee.create(req.body, function(results){
        res.redirect('/admin/employee');
    });
});

//직원 수정
router.put('/', function(req, res, next) {
    employee.update(req.body, function(results){
        res.redirect('/admin/employee');
    });
});

//직원 삭제
router.delete('/', function(req, res, next) {
    employee.delete(req.body.employee_id, function(results){
        res.redirect('/admin/employee');
    });
});

//직원 목록 가져오기
router.get('/', function(req, res, next) {
    employee.find.all(function(results){
        res.render('manage/emp_list', {
            employees: results
        });
    });
});

module.exports = router;