var loki = require('lokijs');
var moment = require('moment');
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
      //var result = posts.get(postid); // returns a document object
      var result = posts.find({'$loki' : postid});  // we use find since it return an array object
      return result;
    },
    getUser: function(username, password) {
      var user = db.getCollection('users');
      var u = user.find({'userLogin' : username} && {  'userPassword' : password });
      return u;
    },
    updatePost: function(id,title,date,post,menuItem) {

        var posts = db.getCollection('posts');
      var result = posts.get(id);

      result.postTitle = title;
      result.postText = post;
      //result.postDate = moment(new Date(date)).utc();
      result.menuItem = menuItem;

      posts.update(result);
      db.saveDatabase();

      return;
    }
}
