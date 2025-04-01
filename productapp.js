var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products'); // Changed to productsRouter
const bodyParser = require('body-parser');
var app = express();

// Parse URL-encoded bodies (form data)
app.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require('mongoose');

var products = require('./routes/products');

var Product = mongoose.model("Product"); // Changed to Product model

app.use('/products', productsRouter); // Changed to /products route

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); // Main index route
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const uri = "mongodb+srv://nathaniel:12345@expressdb.x4rjf.mongodb.net/?retryWrites=true&w=majority&appName=expressdb";

async function connect() {
  try{
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

connect();

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
