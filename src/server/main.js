/**
* Dependencies
*/
var express = require('express');
var parser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passwordless = require('passwordless');
var MongoStore = require('passwordless-mongostore');
var email   = require("emailjs");
var mongoose = require('mongoose');

var routes = require('./routes/index');


/**
* Bootstrap express app
*/
var app = new express();
app.set('port', process.env.PORT || 8080);

app.use(express.static(__dirname + '/../../build/client'))
.listen(process.env.PORT || 8080);


/**
* Email setup
*/
var yourEmail = 'stashbudget@gmail.com';
var yourSmtp = 'smtp.gmail.com';
var smtpServer  = email.server.connect({
   user:    yourEmail, 
   password: process.env.email_pw, 
   host:    yourSmtp, 
   ssl:     true
});


/**
* MongoDB
*/
var pathToMongoDb = process.env.MONGOLAB_URI || 'mongodb://localhost/passwordless-simple-mail';
var pathToMongoDbApp = process.env.MONGOLAB_URI || 'mongodb://localhost/stashApp';



/**
* Path to be send via email
*/
var host = process.env.PORT || 'http://localhost:9001/';


/**
* Setup of Passwordless
*/
passwordless.init(new MongoStore(pathToMongoDb));
passwordless.addDelivery(
    function(tokenToSend, uidToSend, recipient, callback) {
        // Send out token
        smtpServer.send({
           text:    'Hello ' + recipient + '!\nYou can now access Stash by clicking on this token: ' 
                + host + '?token=' + tokenToSend + '&uid=' + encodeURIComponent(uidToSend) 
                + '\n\nEnjoy setting up your financial goals, \nStash Team', 
           from:    yourEmail, 
           to:      recipient,
           subject: 'Stash - Sign in Token!'
        }, function(err, message) { 
            if(err) {
                console.log(err);
            }
            callback(err);
        });
    });


/**
* App MongoDB setup
*/
mongoose.connect(pathToMongoDbApp);


/**
* Middleware setup
*/
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(expressSession({secret: '42', saveUninitialized: false, resave: false}));


/**
* Passwordless middleware setup
*/
app.use(passwordless.sessionSupport());
app.use(passwordless.acceptToken({ successRedirect: '/' }));

app.use('/', routes);


/**
* View engine setup
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


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
