var express = require('express');
var router = express.Router();
var config = require('../../config');

module.exports = function(db) {

    router.get('/', function(req, res, next) {
        var posts = db.getAllPosts(false);
        res.render('pages/index', {
            'blogConfig': config.blog,
            'user': req.session.user,
            'posts': posts
        });
    });

    router.get('/post/:id/:url', function(req, res, next) {
        var post = db.getPost(parseInt(req.params.id));
        res.render('pages/post', {
            'blogConfig': config.blog,
            'user': req.session.user,
            'post': post
        });
    });

    return router;
};
