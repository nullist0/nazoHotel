var express = require('express');
var router = express.Router();

//메인화면
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//조건 방 목록
router.get('/room', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
