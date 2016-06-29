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

db.prototype.updatePost = function(id, title, date, post, menuItem,callback) {

    var posts = lokidb.getCollection('posts');
    var result = posts.get(id);

    result.postTitle = title;
    result.postText = post;
    result.postDate = moment(new Date(date));
    result.menuItem = (menuItem == undefined) ? 0 : 1;

    posts.update(result);
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
