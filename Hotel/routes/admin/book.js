var express = require('express');
var book = require('../../lib/book.js')
var router = express.Router();

//TODO

//예약 생성
router.post('/', function(req, res, next) {
    book.create(req.body, function(results){
        res.redirect('/admin/book');
    });
});

//예약 수정
router.put('/', function(req, res, next) {
    book.update(req.body, function(results){
        res.redirect('/admin/book');
    });
});

//예약 삭제
router.delete('/', function(req, res, next) {
    book.delete(req.body.book_id, function(results){
        res.redirect('/admin/book');
    });
});

//예약목록 가져오기
router.get('/', function(req, res, next) {
    book.find.all(function(results){
        res.render('manage/book_list',{
            books: results
        });
    });
});

module.exports = router;