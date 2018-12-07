var express = require('express');
var router = express.Router();

//로그인
router.get('/', function(req, res, next) {
  
});

//로그인 처리
router.post('/', function(req, res, next) {
  
});

//홈 화면
router.get('/home', function(req, res, next) {
    res.render('manage/index')
});

module.exports = router;