var express = require('express');
var router = express.Router();
var book = require('../lib/book');
var room = require('../lib/room');
var option = require('../lib/option');
var option_kind = require('../lib/option_kind');

//예약정보 방검색처리
router.post('/search/room', function(req, res, next) {
    room.find.forBook(req.body, function(results){
        if(results.length > 0)
            res.redirect(`/book/${results[0].room_id}`);
        else
            res.redirect(`/home`);
    });
});

//예약정보 검색처리
router.post('/search/book', function(req, res, next) {
    
});

//예약 세부
router.get('/:book_id', function(req, res, next) {
    book.find.book(req.params, function(results){
        res.send("TODO");
    });
});

//예약생성
router.post('/:room_id', function(req, res, next) {
    book.createBook(req.body, function(results){
        res.redirect('/book/' + results.book_id);
    });
});

//예약정보 조회
router.get('/:book_id', function(req, res, next) {
  book.find.book(req.params.book_id, function(results){
    res.render('user/book_id', {
        book: results
    });
  });
});

//예약정보 삭제
router.delete('/:book_id', function(req, res, next) {
    book.delete(req.params.room_id, function(results){
        res.redirect('/home');
    });
});

module.exports = router;