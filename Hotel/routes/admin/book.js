var express = require('express');
var moment = require('moment');
var book = require('../../lib/book.js');
var option = require('../../lib/option');
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
    option.find.all(function(opts){
        book.find.all(function(results){
            var option = [];
            for(var i = 0; i < results.length; i++){
                var book_id = results[i].book_id;
                var opt = [];
                for(var j = 0; j < opts.length; j++){
                    if(opts[j].book_id === book_id){
                        opt.push(opts[j].option_name);
                    }
                }
                option.push(opt.join(', '));
            }
            res.render('manage/book_list',{
                books: results,
                options: option,
                moment: moment
            });
        });
    });
});

module.exports = router;