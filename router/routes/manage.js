var express = require('express');
var router = express.Router();
var moment = require('moment');
var config = require('../../config');

module.exports = function(db) {
    router.get('/', isAuthenticated, function(req, res, next) {
        var posts = db.getAllPosts(true);
        res.render('pages/manage/index', {
            'blogConfig': config.blog,
            'user': req.session.user,
            'posts': posts
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
        }
        res.render('pages/manage/edit', {
            'blogConfig': config.blog,
            'user': req.session.user,
            'post': post
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
        var result = db.updatePost(req.body.id, req.body.title, req.body.date, req.body.posttext, req.body.menuitem, req.session.user.userName, req.body.tags, function() {
            //app.locals.menuPosts = db.getMenuPosts();
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
}