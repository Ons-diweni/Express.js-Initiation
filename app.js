/**
 *  App.js c'est le point d'entrée de l'application , il contient la configuration de base de l'application, 
 * y compris les importations des modules nécessaires pour l'application et la gestion des routes.
 */

//Importation  des modules requis pour ce projet
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//La méthode express() crée une nouvelle instance d'application Express
//l'instance app peut être considérée comme une pile de fonctions middleware qui peuvent intercepter et traiter les requêtes HTTP 
//avant de les transmettre à la fonction de gestionnaire de route appropriée.
var app = express();


//Configuration des routes .
//charge le module ./routes/index.js qui peut contenir un ensemble de routes 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//Enregistrer les routes définies dans indexRouter comme routes de niveau supérieur pour l'application
app.use('/', indexRouter);
//intercept requests with path begin with "/users"
app.use('/users', usersRouter);


//these application-level middelwares with no mount path : intercept any request since there is no path is defined.
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