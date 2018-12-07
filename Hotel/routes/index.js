var express = require('express');
var router = express.Router();

//메인화면
router.get('/home', function(req, res, next) {
  res.render('user/index');
});

router.get('/contact', function(req, res, next) {
  res.render('user/contact');
});

router.get('/room*', function(req, res, next) {
  res.render('user/room');
});

//예약정보 검색
router.get('/search', function(req, res, next) {
    console.log("hi");
    // res.send("hi")
    res.render('user/search');
});

//조건 방 목록
// router.get('/room', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
