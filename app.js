
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , util = require('util')
  , routes = require('./routes')
  , user = require('./routes/user')
  , twitter = require('./routes/twitter')

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.session( { secret : 'mykeygoeshere' }));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/auth/twitter', twitter.auth);
app.get('/auth/twitter/callback', twitter.auth_return);
// app.get('/auth/twitter', function(req,res) {
//   res.render('twitter_auth');
// });
// app.get('/auth/twitter/callback', function(req, res) {
//   res.render('auth_success', { title: 'Good Buzz Hub' });
// });

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
