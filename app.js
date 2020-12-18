var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')



var indexRouter = require('./routes/index');
var serverTime = require('./routes/serverTime')
var register = require('./routes/register')
var UserInfo = require("./routes/UserInfo")
var game = require("./routes/game")
var leaderBoard = require('./routes/leaderBoard')
var app = express();

// view engine setup

const uri = "mongodb+srv://swetabh:swetabhsubham@cluster0.bgzss.mongodb.net/testDatabase?retryWrites=true&w=majority"
mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true })



mongoose.set('useCreateIndex', true)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/now', serverTime);
app.use('/register', register);
app.use('/me', UserInfo)
app.use('/game',game )
app.use('/leaderboard',leaderBoard)


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
