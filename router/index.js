var config = require('../config');

module.exports = function (app,db) {
    app.use('/', require('./routes/default')(db));
    app.use('/', require('./routes/login')(db));
    app.use('/manage', require('./routes/manage')(db));

    //404 everthing else
    app.use(function(req, res, next) {
        res.status(404).render('pages/404', {
            'blogConfig': config.blog,
            'user': req.session.user
        });
    });

};
