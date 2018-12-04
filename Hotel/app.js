var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//customer
var indexRouter = require('./routes/index');
var bookRouter = require('./routes/book');

//admin
var adminIndexRouter = require('./routes/admin/index');
var adminBookRouter = require('./routes/admin/book');
var adminEmployeeRouter = require('./routes/admin/employee');

var adminFacilityRouter = require('./routes/admin/facility');
var adminRoomRouter = require('./routes/admin/room');
var adminClaimRouter = require('./routes/admin/claim');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//customer
app.use('/', indexRouter);
app.use('/book', bookRouter);

//admin
app.use('/admin', adminIndexRouter);
app.use('/admin/book', adminBookRouter);
app.use('/admin/claim', adminClaimRouter);

app.use('/admin/employee', adminEmployeeRouter);
app.use('/admin/facility', adminFacilityRouter);
app.use('/admin/room', adminRoomRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
