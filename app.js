var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var delay = require('express-delay');
const cors = require('cors');

var routes = require('./routes/index');


var users = require('./routes/users');
const pessoas = require('./routes/pessoas');
const grupos = require('./routes/grupos');

const login = require('./routes/kids/login')
const pessoapre = require('./routes/kids/pessoapre')
const reunioes = require('./routes/kids/reunioes')
const usuario = require('./routes/kids/usuario')
const visitante = require('./routes/kids/visitante')

/*
const login = require('./routes/kids/login')
const home = require('./routes/kids/home-new')
const reuniao = require('./routes/kids/reuniao-new')
const visitante = require('./routes/kids/visitante-new')
const configuracao = require('./routes/kids/configuracao-new')
const familia = require('./routes/kids/familia-new')
const pessoa = require('./routes/kids/pessoa-new')
*/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(delay(200, 3000));

app.use('/', users);
app.use('/', pessoas);
app.use('/', grupos);
app.use('/', login);
app.use('/', pessoapre);
app.use('/', reunioes);
app.use('/', usuario);
app.use('/', visitante);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
