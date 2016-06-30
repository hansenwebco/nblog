var loki = require('lokijs');
var moment = require('moment');
var lokidb;

var db = function(callback) {
    lokidb = new loki('blog.json');
    lokidb.loadDatabase({}, function() {
        if (typeof callback === "function")
            callback();
    });
};

db.prototype.getAllPosts = function() {
    return lokidb.getCollection('posts');
}

db.prototype.getPost = function(postid) {
    var posts = lokidb.getCollection('posts');
    var result = posts.find({
        '$loki': postid
    }); // we use find() not get() since it return an array object
    return result;
}

db.prototype.getUser = function(username, password) {
    var user = lokidb.getCollection('users');
    var u = user.find({
        'userLogin': username
    } && {
        'userPassword': password
    });
    return u;
}

db.prototype.updatePost = function(id, title, date, post, menuItem, author, callback) {

    var posts = lokidb.getCollection('posts');
    var result;
    if (id > 0) // edit record
        result = posts.get(id);
    else // create new record
        result = {};

    result.postTitle = title;
    result.postText = post;
    result.postDate = moment.utc().format();
    result.menuItem = (menuItem == undefined) ? 0 : 1;
    result.postAuthor = author;
    result.postTags = [];

    if (id > 0)
      posts.update(result);
    else
      posts.insert(result);

    lokidb.saveDatabase();

    if (typeof callback === "function")
        callback();

}

db.prototype.getMenuPosts = function() {
    var posts = lokidb.getCollection('posts');
    var results = posts.find({
        'menuItem': 1
    });
    return results;
}

module.exports = db;
