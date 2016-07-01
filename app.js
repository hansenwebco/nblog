var express = require('express');
var gzip = require('compression');
var engine = require('ejs-mate');
var session = require('express-session');
var bodyParser = require('body-parser')
var moment = require('moment');
var database = require('./db');
var config = require('./config');
var app = express();

var sessionOptions = {
  secret: config.settings.sessionSecret,
  resave : true,
  saveUninitialized : false
};

// configure express
app.use(express.static(__dirname + '/public'));
app.use(gzip()); // make things smaller
app.use(session(sessionOptions)); // let's use sessions
app.use(bodyParser.urlencoded({ extended: false })) // we need to be able to read form posts
app.set('view engine', 'ejs');
app.locals.moment = require('moment');
app.locals.textHelpers = require('./texthelpers');
app.engine('ejs', engine); // use ejs-locals for all ejs templates:

var db = new database(function() {
  app.locals.menuPosts = db.getMenuPosts();
});

// routes
app.get('/', function(req, res, next) {
    var posts = db.getAllPosts();
    res.render('pages/index', {
        'blogConfig': config.blog,
        'user': req.session.user,
        'posts': posts
    });
});

app.get('/login', function(req, res, next) {
    res.render('pages/login', {
        'blogConfig': config.blog,
        'user': req.session.user
    });
});

app.get('/manage', isAuthenticated, function(req, res, next) {
    var posts = db.getAllPosts();
    res.render('pages/manage/index', {
        'blogConfig': config.blog,
        'user': req.session.user,
        'posts': posts
    });
});

app.get('/manage/create-new-post', isAuthenticated, function(req,res,next) {
  var post = { 'postTitle': '', 'postDate' : moment(), 'postText' : '' , id: 0, 'menuItem' : 0 ,'postTags': ''}

  res.render('pages/manage/edit', {
      'blogConfig': config.blog,
      'user': req.session.user,
      'post': post
  });
});
app.get('/manage/:id/:url', isAuthenticated, function(req, res, next) {
    var post = db.getPost(parseInt(req.params.id));
    res.render('pages/manage/edit', {
        'blogConfig': config.blog,
        'user': req.session.user,
        'post': post[0]
    });
});

app.get('/post/:id/:url', function(req, res, next) {
    var post = db.getPost(parseInt(req.params.id));
    res.render('pages/post', {
        'blogConfig': config.blog,
        'user': req.session.user,
        'post': post
    });
});

app.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
});

app.post('/login', function(req, res, next) {
    var user = db.getUser(req.body.username, req.body.password);
    if (user.length > 0) {
        req.session.user = { 'userName': user[0].userFullName, 'auth': true, 'userID': user[0].$loki};
        res.redirect('/');
    } else {
        res.send('Incorrect login.');
    }
});

app.post('/manage/edit/', isAuthenticated, function(req, res, next) {
  var result = db.updatePost(req.body.id, req.body.title, req.body.date, req.body.posttext, req.body.menuitem, req.session.user.userName, req.body.tags, function() {
    app.locals.menuPosts = db.getMenuPosts();
    res.redirect('/manage');
  });
});

// 404 everthing else
app.use(function(req, res, next) {
    res.status(404).render('pages/404', {
        'blogConfig': config.blog,
        'user': req.session.user
    });
});

function isAuthenticated(req, res, next) {
    if (req.session.user && req.session.user.auth)
        next();
    else
        res.redirect('/');
}

app.listen(config.settings.serverPort, function() {
    console.log('App listening on port ' + config.settings.serverPort);
});
