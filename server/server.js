module.exports = function() {

    var express = require('express');
    var gzip = require('compression');
    var engine = require('ejs-mate');
    var session = require('express-session');
    var sessionFileStore = require('session-file-store')(session);
    var bodyParser = require('body-parser');
    var moment = require('moment');
    var config = require('../config');
    var database = require('../db');
    var app = express();

    var sessionOptions = {
        store: new sessionFileStore(),
        secret: config.settings.sessionSecret,
        resave: true,
        saveUninitialized: false
    };

    var db = new database(function() {
        app.locals.menuPosts = db.getMenuPosts();
    });

    // configure express
    app.use(express.static('./public'));
    app.use(gzip()); // make things smaller
    app.use(session(sessionOptions)); // let's use sessions
    app.use(bodyParser.urlencoded({extended: false })); // we need to be able to read form posts
    app.set('view engine', 'ejs'); // view engine duh
    app.locals.moment = require('moment'); // makes working with time easier
    app.locals.textHelpers = require('../texthelpers'); // local helpers
    app.engine('ejs', engine); // use ejs-locals for all ejs templates:

    var router = require('../router')(app, db);

    app.listen(config.settings.serverPort, config.settings.serverIP, function() {
        console.log('App listening on ' + config.settings.serverIP + ' Port: ' + config.settings.serverPort);
    });

};
