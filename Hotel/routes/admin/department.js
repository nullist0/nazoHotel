var express = require('express');
var department = require("../../lib/department.js");
var router = express.Router();

//부서 생성
router.post('/', function(req, res, next) {
    department.create(req.body, function(results){
        res.redirect('/admin/employee/dept');
    });
});

//부서 수정
router.put('/', function(req, res, next) {
    department.update(req.body, function(results){
        res.redirect('/admin/employee/dept');
    });
});

//부서 삭제
router.delete('/', function(req, res, next) {
    department.delete(req.body.name, function(results){
        res.redirect('/admin/employee/dept');
    });
});

//부서 목록 가져오기
router.get('/', function(req, res, next) {
    department.find.all(function(departments){
        res.render('manage/dept_list', {
            depts: departments
        });
    });
});

module.exports = router;