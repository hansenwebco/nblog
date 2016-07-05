var assert = require('chai').assert;
var database = require('../db');
var expect    = require("chai").expect;
var db = new database();

describe("Database Manager", function() {
    it("Reads a Single Post from the Datastore", function() {
      var post = db.getPost(1);
      expect(post).to.be.a('object');
      expect(post.postTitle).to.equal('My First Blog Post');
    });

    it("Reads all posts in the database" , function () {
      var posts = db.getAllPosts(true);
      expect(posts).to.be.an('array');
      expect(posts).to.have.length.above(2);
    });
});
