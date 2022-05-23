/*Imports*/
var createError = require('http-errors');

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express();

// Config JSON response
app.use(express.json())

// Open Route - Public Route
app.get('/', (req,res) => {
  res.status(200).json({ msg: 'Bem vindo a nossa API' })
})

app.listen(3000)

// Register User
app.post('/auth/register', async(req,res) => {
  const {name, email, password, confirmpassword} = req.body  

  //Validations
  if(!name) {
    return res.status(422).json({ msg: 'O nome é obrigatório!' }) 
  }  
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
