var express = require('express');
var router = express.Router();
var book = require('../lib/book');
var room = require('../lib/room');
var customer = require('../lib/customer');
var option = require('../lib/option');
var option_kind = require('../lib/option_kind');
var moment = require("moment");

//예약정보 방검색처리
router.post('/room', function(req, res, next) {
    req.body.check_in = moment(req.body.check_in, 'MM/DD/YYYY').format('YYYY-MM-DD');
    req.body.check_out = moment(req.body.check_out, 'MM/DD/YYYY').format('YYYY-MM-DD');
    room.find.forBook(req.body, function(room){
        if(room.length > 0){
            req.body.room_id = room[0].room_id;
            req.body.room_price = room[0].room_price;
            console.log(req.body);
            book.create(req.body, function(results){
                res.redirect(`/book/more/${results.insertId}`);
            });
        }
        else
            res.redirect(`/home`);
    });
});

//예약 세부정보 입력
router.get('/more/:book_id', function(req, res, next) {
    book.find.bookJoinRoom(req.params.book_id, function(books){
        console.log(books[0]);
        var data = books[0];
        var date1 = new Date(data.check_in);
        var date2 = new Date(data.check_out);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDay = Math.ceil(timeDiff / (1000 * 3600 * 24));
        room.find.One(data.room_id, function(rooms){
            var froom = rooms[0];
            option_kind.find.all(function(option){
                console.log({
                    id: data.book_id,
                    options : option,
                    book: data,
                    diffDays: diffDay
                });
                res.render("user/book", {
                    id: data.book_id,
                    options : option,
                    book: data,
                    diffDays: diffDay,
                    room: froom
                });
            });
        });
    });
});

//예약완료
router.put('/:book_id', function(req, res, next) {
    console.log(req.body);
    var options = {
        book_id: req.params.book_id,
        options: req.body.option,
        apply_num: parseInt(req.body.people_num)
    };
    var customerData = {
        first_name: req.body.rsvFirstNm,
        last_name: req.body.rsvLastNm,
        gender: req.body.rsvGender,
        birthday: req.body.rsvBrthdyYY+ '-' + req.body.rsvBrthdyMT +'-'+req.body.rsvBrthdyDE,
        mobile_number: req.body.rsvTel1+req.body.rsvTel2+req.body.rsvTel3,
        email: req.body.rsvEmail1,
        membership: 0
    }
    customer.create(customerData, function(cresult){
        console.log('created customer');
        req.body.customer_id = cresult.insertId;
        req.body.book_id = req.params.book_id;
        option.create(options, function(oresults){
            option_kind.find.ofBook(req.params.book_id, function(option_kinds){
                var i = 0;
                req.body.option_price = 0; 
                while(i < option_kinds.length){
                    req.body.option_price += option_kinds[i].option_price_per_num * options.apply_num;
                    i++;
                }
                req.body.total_price = parseInt(req.body.total_price);
                req.body.total_price += req.body.option_price;
                book.update(req.body, function(bresult){
                    console.log('update book');
                    // option.create(asdf, function(oresult){
                        res.redirect('/book/' + req.params.book_id);
                    // });
                });
            });
        });
    });
});

//예약정보 조회
router.get('/:book_id', function(req, res, next) {
    book.find.book(req.params, function(books){
        var book = books[0];
        console.log(book);
        room.find.One(book.room_id, function(rooms){
            var froom = rooms[0];
            book.check_in = moment(new Date(book.check_in)).format('YYYY년 MM월 DD일');
            book.check_out = moment(new Date(book.check_out)).format('YYYY년 MM월 DD일');
            customer.find.one(book.customer_id, function(customers){
                var customer = customers[0];
                option.find.ofBook(req.params.book_id, function(options){
                    console.log(options);
                    res.render("user/book_id",{
                        book: books[0],
                        options: options,
                        customer: customer,
                        room: froom
                    });
                });
            });
        });
    });
});

//예약정보 삭제
router.delete('/:book_id', function(req, res, next) {
    book.delete(req.params.book_id, function(results){
        res.redirect('/home');
    });
});

module.exports = router;