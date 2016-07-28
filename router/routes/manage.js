var express = require('express');
var router = express.Router();
var moment = require('moment');
var config = require('../../src/config');

module.exports = function(app, db) {

    router.get('/', isAuthenticated, function(req, res, next) {
        var posts = db.getAllPosts(false);
        var pages = db.getAllPages();
        res.render('pages/manage/index', {
            'blogConfig': config.blog,
            'user': req.session.user,
            'posts': posts,
            'pages': pages
        });
    });

    router.get('/create-new-post', isAuthenticated, function(req, res, next) {
        // TODO: should probably create a base "post" object for blog as a whole
        var post = {
            'postTitle': '',
            'postDate': moment(),
            'postText': '',
            id: 0,
            'menuItem': 0,
            'postTags': ''
        };
        res.render('pages/manage/edit', {
            'blogConfig': config.blog,
            'user': req.session.user,
            'post': post
        });
    });
    router.get('/delete/:id', isAuthenticated, function(req, res, next) {

        db.deletePost(parseInt(req.params.id), function() {
            app.locals.menuPosts = db.getMenuPosts();
            res.redirect('/manage');
        });
    });
    router.get('/:id/:url', isAuthenticated, function(req, res, next) {
        var post = db.getPost(parseInt(req.params.id));
        res.render('pages/manage/edit', {
            'blogConfig': config.blog,
            'user': req.session.user,
            'post': post
        });
    });

    router.post('/edit/', isAuthenticated, function(req, res, next) {
        var result = db.updatePost(req.body.id, req.body.title, req.body.date, req.body.posttext, req.body.menuitem, req.session.user.userName, req.body.tags, req.body.ordinal, function() {
            app.locals.menuPosts = db.getMenuPosts();
            res.redirect('/manage');
        });
    });

    function isAuthenticated(req, res, next) {
        if (req.session.user && req.session.user.auth)
            next();
        else
            res.redirect('/');
    }

    return router;
};
