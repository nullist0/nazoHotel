var express = require('express');
var router = express.Router();
var book = require('../lib/book')

//예약 세부
router.get('/', function(req, res, next) {
  
});

//예약생성
router.post('/', function(req, res, next) {
    book.createBook(req.body, function(results){
    });
});

//예약정보 검색
router.get('/search', function(req, res, next) {
  
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