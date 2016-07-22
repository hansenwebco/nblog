var express = require('express');
var router = express.Router();
var config = require('../../src/config');

module.exports = function(db) {
    router.get('/login', function(req, res, next) {
        res.render('pages/login', {
            'blogConfig': config.blog,
            'user': req.session.user
        });
    });

    router.post('/login', function(req, res, next) {
        var user = db.getUser(req.body.username, req.body.password);
        if (user.length > 0) {
            req.session.user = {
                'userName': user[0].userFullName,
                'auth': true,
                'userID': user[0].$loki
            };
            res.redirect('/');
        } else {

            // TODO: make this a global function of some sort
            message = {};
            message.text = '<b>Error</b>: Sorry the login and password combination did not work, please try again or check out configuration files.';
            message.class = 'danger';

            res.render('pages/login', {
                'blogConfig': config.blog,
                'user': req.session.user
            });
        }
    });

    router.get('/logout', function(req, res, next) {
        req.session.destroy();
        res.redirect('/');
    });

    return router;
};
