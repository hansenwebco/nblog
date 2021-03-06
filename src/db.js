var loki = require('lokijs');
var moment = require('moment');
var lokidb;

var db = function(dbFile, callback) {
    lokidb = new loki(dbFile);
    lokidb.loadDatabase({}, function() {
        if (typeof callback === "function")
            callback();
    });
};

db.prototype.getAllPosts = function(showMenuItems) {
    var posts = lokidb.getCollection('posts');
    var result = posts.chain()
        .where(function(obj) {
            return (obj.menuItem == 1 && showMenuItems === true) || obj.menuItem === 0;
        })
        .sort(function(obj1, obj2) {
            if (obj1.postDate == obj2.postDate) return 0;
            if (moment(obj1.postDate).isAfter(moment(obj2.postDate))) return -1;
            if (moment(obj2.postDate).isAfter(moment(obj1.postDate))) return 1;
        })
        .sort(function(obj1, obj2) {
            if (obj1.postDate == obj2.postDate) return 0;
            if (obj1.menuItem > obj2.menuItem) return -1;
            if (obj1.menuItem < obj2.menuItem) return 1;
        })
        .data();

    // TODO: add paging .offsset(x).limit(x) on result query
    return result;
};

db.prototype.getAllPages = function() {
    var posts = lokidb.getCollection('posts');
    var result = posts.chain()
        .where(function(obj) {
            return obj.menuItem === 1;
        })
        .simplesort('ordinal')
        .data();
    //.sort(function(obj1, obj2) {
    //    if (obj1.postDate == obj2.postDate) return 0;
    //    if (moment(obj1.postDate).isAfter(moment(obj2.postDate))) return -1;
    //    if (moment(obj2.postDate).isAfter(moment(obj1.postDate))) return 1;
    //})


    return result;
};

db.prototype.getPost = function(postid) {
    var posts = lokidb.getCollection('posts');
    var result = posts.get(postid);
    return result;
};

db.prototype.getUser = function(username, password) {
    var user = lokidb.getCollection('users');
    var u = user.find({
        'userLogin': username
    } && {
        'userPassword': password
    });
    return u;
};

db.prototype.updatePost = function(id, title, date, post, menuItem, author, tags, ordinal, callback) {

    var posts = lokidb.getCollection('posts');
    var result;
    if (id > 0) // edit record
        result = posts.get(id);
    else // create new record
        result = {};

    result.postTitle = title;
    result.postText = post;
    result.postDate = moment.utc(date, "M/d/YYYY h:mm:ss A");
    result.menuItem = (menuItem === undefined) ? 0 : 1;
    result.postAuthor = author;
    result.postTags = tags.split(',');
    result.ordinal = ordinal;

    if (id > 0)
        posts.update(result);
    else
        posts.insert(result);


    lokidb.saveDatabase();

    if (typeof callback === "function")
        callback();
};

db.prototype.deletePost = function(postid, callback) {
    var posts = lokidb.getCollection('posts');

    var result = posts.get(postid);
    posts.remove(result);
    lokidb.saveDatabase();

    if (typeof callback === "function")
        callback();

};

db.prototype.getMenuPosts = function() {
    var posts = lokidb.getCollection('posts');
    var results = posts.chain()
        .find({
            'menuItem': 1
        })
        .simplesort('ordinal')
        .data();
    return results;
};

module.exports = db;
