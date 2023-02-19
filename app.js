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


//
app.use((req, res, next) => {
    //permettra à toutes les demandes de toutes les origines d'accéder à votre API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //dèfinir les méthodes http acceptèes par le serveur
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//these application-level middelwares with no mount path : intercept any request since there is no path is defined.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Configuration des routes .
//charge le module ./routes/index.js qui peut contenir un ensemble de routes 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//app.use([path,] callback) est une méthode Express utilisée pour spécifier une fonction middleware qui sera exécutée pour toutes les requêtes entrantes avant qu 'elles n'atteignent leur route correspondante.
//path est une chaîne de caractères optionnelle qui représente le chemin d'accès sur lequel le middleware doit être exécuté. 
//Si aucune valeur n'est fournie pour path, le middleware sera exécuté pour toutes les requêtes entrantes.
//Dans cette ligne elle est utilisé pour enregistrer les routes définies dans indexRouter comme routes de niveau supérieur pour l'application
app.use('/', indexRouter);
//intercept requests with path begin with "/users"
app.use('/users', usersRouter);





app.use('/staff', (req, res, next) => {
    const staff = [{ nom: 'Ons', prenom: 'Diweni', age: 25 }, { nom: 'Houssem', prenom: 'GHallabi', age: 35 }]
    res.json(staff)

})






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