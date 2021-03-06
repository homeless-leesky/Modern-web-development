var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const history = require('connect-history-api-fallback');
const cors = require('cors');
const cfg = require('../config/index');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if(process.env.NODE_ENV !== 'production') app.use(cors())
app.use('/api', require('./routes/api'));
app.use(history());
app.use(express.static(path.join(__dirname,'../','fe', 'dist')));


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
  res.send({
    msg : err.message
  })
});

module.exports = app;

const mongoose = require('mongoose');
// const User = require('./models/users');


console.log(cfg.dbUrl)
mongoose.connect(cfg.dbUrl, {useNewUrlParser : true, useUnifiedTopology: true},(err) => {
  if(err) return console.error(err);
  console.log('mongoose connected')

  // ---------create-------------
  // User.create({name : "leesky"}).then((r) => {
  //   console.log(r);
  // }).catch((e) => {
  //   console.error(e)
  // }) 
  
  //---------read---------------
  // User.find().then((r) => {
  //     console.log("test: ",r);
  // }).catch((e) => {
  //   console.error(e)
  // })

  //--------update---------------
  // User.updateOne({
  //   _id: '5e3d2ec959f9495cdc78ef99'
  // },{
  //   $set: {
  //     age: 22
  //   }
  // }).then((r) => { //promise에 대한 공부
  //   console.log('test: ',r);
  //   console.log('updated')
  //   return User.find()
  // }).then((r) => {
  //   console.log(r)
  // }).catch((e) => {
  //   console.error(e)
  // })

  //--------delete-----------------
  // User.deleteOne({
  //   name : 'leesky'
  // }).then((r)=>{
  //   console.log(r)
  //   return User.find()
  // }).then((r) => {
  //   console.log(r)
  // }).catch((e)=>{
  //   console.error(e)
  // })

  // User.deleteMany().then((r)=>{
  //   console.log(r)
  // }).catch((e)=>{
  //   console.error(e)
  // })
})
console.log(`[NOTICE] ${process.env.NODE_ENV} 모드로 서버가 실행되었습니다.`)

// const User =require('./models/users')
// const Board = require('./models/boards')
// const Article = require('./models/articles')

// // Article.create({ title: 'aaa', content: 'kkkk', _user: '5e4e70b4e37e7491f473fd52', _board: '5e4fca35ad319f4ffced6ed0'})
// // .then((r) => {
// //   console.log(r)
// // })
// // Article.deleteMany({ title:'aaa'}).then((r) => {
// //   console.log (r)
// // })

// Article.findOne().populate('_user','name').populate('_board').then((r) => {
//   console.log(r)
// })