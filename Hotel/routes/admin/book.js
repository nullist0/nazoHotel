var express = require('express');
var book = require('../../lib/book.js')
var router = express.Router();

//TODO 예약목록 가져오기
router.get('/', function(req, res, next) {
    book.find.all(function(results){
        //todo
    });
});

module.exports = router;