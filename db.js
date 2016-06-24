var loki = require('lokijs');
var db = new loki('blog.json');

// load database and start server
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
    }
}
