var config = {};

// general settings
config.settings = {};
config.settings.serverPort = process.env.OPENSHIFT_NODEJS_PORT || 3000;
config.settings.serverIP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
config.settings.sessionSecret = "JUSTPUTASECRETHERE!";

// blog settings
config.blog = {};
config.blog.title = "nBlog - A Blog Made with NodeJs";
config.blog.titleShort = "nBlog";
config.blog.ownerName = "Blog Owner";
config.blog.login = 'admin';
config.blog.password = 'admin';

module.exports = config;
