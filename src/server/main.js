var express = require('express');
var parser = require('body-parser');


/**
* Bootstrap express app
*/
var app = new express();


if (process.env.NODE_ENV === 'development') {
    console.log('Development environment!');
}


//require('./database.js');

app.set('port', process.env.PORT || 8080);

app.get('/', function(req, res) {
	res.render('./../src/client/index.ejs', {});
})
.use(express.static(__dirname + '/../../build/client'))
.listen(8080);


/**
* Middleware setup
*/
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

//require('./routes/items.js')(app);