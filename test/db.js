var assert = require('chai').assert;
var database = require('../db');
var expect    = require("chai").expect;
var db = new database();

describe("Database Manager", function() {
    it("Reads a Single Post from the Datastore", function() {
      var post = db.getPost(1);
      expect(post).to.be.a('array');
      expect(post[0].postTitle).to.equal('My First Blog Post');
    });

    it("Reads all posts in the database" , function () {
      var posts = db.getAllPosts();
      expect(posts).to.be.an('object');
      expect(posts.data).to.have.length(2);
    })
});
