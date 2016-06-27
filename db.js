var loki = require('lokijs');
var db = new loki('blog.json');

// load database
console.log("Starting database...");
db.loadDatabase({}, function() {
    console.log("Database started...");
});

module.exports = {
    getAllPosts: function() {
        return db.getCollection('posts');
    },
    getPost: function(postid)
    {
      var posts = db.getCollection('posts');
      var result = posts.get(postid);
      return result;
    },
    getUser: function(username, password) {
      var user = db.getCollection('users');
      var u = user.find({'userLogin' : username} && {  'userPassword' : password });
      return u;
      }
    }
