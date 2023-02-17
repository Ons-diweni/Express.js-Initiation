/**
 *  App.js c'est point d'entrée de l'application , il contient la configuration de base de l'application, 
 * y compris les importations de modules nécessaires pour l'application et la gestion des routes.
 */


//Importation  des modules requis pour ce projet
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//création d'une instance d'application Express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//Configuration des routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//application-level middelware : intercept request with path "/"
app.use('/', indexRouter);

//application-level middelware : intercept request with path "/users"
/* app.use('/users', usersRouter); */
app.use('/users', usersRouter);



/* var myLogger = function(req, res, next) {
    console.log('LOGGED');
    next();
};

//application-level middelware : intercept any request since there is no path is defined
app.use(myLogger);
 */


//application-level middelware with no mount path : intercept any request since there is no path is defined
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



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