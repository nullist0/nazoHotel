var express = require('express');
var router = express.Router();
var book = require('../lib/book');
var room = require('../lib/room');
var customer = require('../lib/customer');
var option = require('../lib/option');
var option_kind = require('../lib/option_kind');

//예약정보 방검색처리
router.post('/room', function(req, res, next) {
    room.find.forBook(req.body, function(room){
        if(room.length > 0){
            res.redirect(`/book/more/${result.insertid}`);    
        }
        else
            res.redirect(`/home`);
    });
});

//예약정보 검색창
router.get('/search', function(req, res, next) {
    res.render('user/search');
});

//예약정보 검색처리
router.post('/search/id', function(req, res, next) {
    book.find.book(req.body, function(results){
        if(results.length > 0)
            res.redirect(`/book/${results[0].book_id}`);
        else
            res.redirect(`/book/search`);
    });
});

//예약정보 검색처리
router.post('/search/data', function(req, res, next) {
    book.find.book(req.body, function(results){
        if(results.length > 0)
            res.redirect(`/book/${results[0].book_id}`);
        else
            res.redirect(`/book/search`);
    });
});

//예약 세부정보 입력
router.get('/more/:room_id', function(req, res, next) {
    res.render("user/book", {
        room: room_id
    });
});

//예약생성
router.post('/:room_id', function(req, res, next) {
    customer.create(req.body, function(cresult){
        req.body.customer_id = cresult.insertid;
        book.create(req.body, function(bresult){
            option.create(asdf, function(oresult){
                res.redirect('/book/' + bresult.book_id);
            });
        });
    });
});

//예약정보 조회
router.get('/:book_id', function(req, res, next) {
    book.find.book(req.params, function(books){
        option.find.ofBook(req.params.book_id, function(options){
            res.render("user/book_id",{
                books: books,
                options: options
            });
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