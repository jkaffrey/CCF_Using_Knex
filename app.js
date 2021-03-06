'use strict';

var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    morgan         = require('morgan'),
    methodOverride = require('method-override');

var movies = require('./routes/movies');

app.set('view engine', 'ejs');
app.use(function(req, res, next) {
  if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end(/* icon content here */);
    } else {
        next();
    }
});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));

app.use('/', movies);

var daPort = process.env.PORT || 3000;
app.listen(daPort, function() {

  console.log("Listening on port: " + daPort);
});
