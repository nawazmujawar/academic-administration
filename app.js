var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

const transporter = require('./src/configs/nodemailer');



var app = express();

//Exports Router
const teacherRouter = require('./src/routes/teacher');
const homeRouter = require('./src/routes/home');
const signUpRouter = require('./src/routes/signup');
const signInRouter = require('./src/routes/signin');
const studentRouter = require('./src/routes/student');
const adminRouter = require('./src/routes/admin');

const DB_URL = 'mongodb+srv://nawaz:87654321@cluster0-0q2xh.mongodb.net/test?retryWrites=true&w=majority'; //keep secret

//Database connection
mongoose.connect(DB_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, dbName: 'tkit' }, (err) => {
  if (!err) {
    console.log('Connected to database');
  } else {
    console.log(err);
  }
});

//Cookies
app.use(session({
  name: "ssid",
  resave: false,
  saveUninitialized: false,
  secret: "tkit@9420776721", //Your secret key keep it secret
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    sameSite: true  
  }
}));

//Cross site originating
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PATCH, PUT,POST, GET, DELETE, OPTIONS');
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads/attachments')));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res, next) => {
  return res.redirect('/home');
});
//Routes
//Homepage
app.use('/home', homeRouter);
//Sign up router
app.use('/signup', signUpRouter);
//Sign in router
app.use('/signin', signInRouter);
//Teacher router
app.use('/teacher', teacherRouter);
//Student router
app.use('/student', studentRouter);
//Admin router
app.use('/admin', adminRouter); 1

app.use((req, res, next) => {
  return res.status(404).send('notfound');
});

module.exports = app;
