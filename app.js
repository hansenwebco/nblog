var express = require('express');
var gzip = require('compression');
var engine = require('ejs-mate');
var db = require('./db');
var config = require('./config');

var app = express();
var posts;

// configure express
app.use(express.static(__dirname + '/public'));
app.use(gzip());
app.set('view engine', 'ejs');
app.locals.moment = require('moment');
app.locals.textHelpers = require('./texthelpers');
app.engine('ejs', engine); // use ejs-locals for all ejs templates:


// routes
app.get('/', function(req, res, next) {
    posts = db.getAllPosts();
    res.render('pages/index', {
        'blogConfig': config.blog,
        'posts': posts.data
    });
});

app.get('/post/:id/:url', function(req, res, next) {
  var post = db.getPost(parseInt(req.params.id));
  res.render('pages/post', {
      'blogConfig': config.blog,
      'post': post
  });
});

app.listen(config.settings.serverPort, function() {
    console.log('App listening on port ' + config.settings.serverPort);
});
