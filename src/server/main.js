/**
* Dependencies
*/
var express = require('express');
var parser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');


/**
* Bootstrap express app
*/
var app = new express();

app.set('port', process.env.PORT || 8080);

/*app.get('/', function(req, res) {
	res.render('./../src/client/index.ejs', {});
})*/
app.use(express.static(__dirname + '/../../build/client'))
.listen(8080);


/**
* Middleware setup
*/
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);


/**
* View engine setup
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


/**
* Passport config
*/ 
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


/**
* Mongoose
*/
mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');


/**
* Catch 404 and forward to error handler
*/
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/**
* Error handlers
*/ 
// development error handler, will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler,  no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;


// OTHER STUFF
/*if (process.env.NODE_ENV === 'development') {
    console.log('Development environment!');
}*/

//require('./database.js');
//require('./routes/items.js')(app);