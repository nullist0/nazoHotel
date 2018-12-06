var express = require('express');
var router = express.Router();
var book = require('../lib/book');
var option_kind = require('../lib/option_kind');

//예약 세부
router.get('/', function(req, res, next) {
  
});

//예약생성
router.post('/', function(req, res, next) {
    book.createBook(req.body, function(results){
        res.redirect('/book/' + results.book_id);
    });
});

//예약정보 검색
router.get('/search', function(req, res, next) {
    // TO DO
    // option_kind.find.money(req.body, function(results){
    //     req.body.option_money=results.option_kind;
    // });

    book.find.findBook(req.body, function(results){
        res.redirect('/book/' + results.book_id);
    });
});

//예약정보 검색처리
router.post('/search', function(req, res, next) {

});

//예약정보 조회
router.get('/:id', function(req, res, next) {
  
});

//예약정보 삭제
router.delete('/:id', function(req, res, next) {
    book.delete(req.body, function(results){
        res.redirect('/home');
    });
});

module.exports = router;