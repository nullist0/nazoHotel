var express = require('express');
var router = express.Router();
var book = require('../lib/book');

//예약정보 검색창
router.get('/', function(req, res, next) {
    res.render('user/search');
});

//예약정보 검색처리
router.post('/id', function(req, res, next) {
    book.find.book(req.body, function(results){
        if(results.length > 0)
            res.redirect(`/book/${results[0].book_id}`);
        else
            res.redirect(`/search`);
    });
});

//예약정보 검색처리
router.post('/data', function(req, res, next) {
    book.find.book(req.body, function(results){
        console.log(req.body);
        console.log(results);
        if(results.length > 0)
            res.redirect(`/book/${results[0].book_id}`);
        else
            res.redirect(`/search`);
    });
});

module.exports = router;