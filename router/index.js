var config = require('../src/config');

module.exports = function (app,db) {
    app.use('/', require('./routes/default')(db));
    app.use('/', require('./routes/login')(db));
    app.use('/manage', require('./routes/manage')(app,db));

    //404 routes we can't find!
    app.use(function(req, res) {
        res.status(404).render('pages/404', {
            'blogConfig': config.blog,
            'user': req.session.user
        });
    });

    // if it's not 404 it's 500!
    app.use(function(err, req, res) {
        console.log(err);
        res.status(500);
        res.send(err);
    });

};
