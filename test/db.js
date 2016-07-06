var assert = require('chai').assert;
var database = require('../db');
var expect = require("chai").expect;
var config = require('../config');

var db = new database('testdb.json', function() {
    describe("Database Manager", function() {

        describe("Post Management", function() {

                it("Reads a single post from the datastore", function() {
                    var posts = db.getAllPosts(true);
                    var post = db.getPost(1);

                    expect(post).to.be.a('object');
                    expect(post.postTitle).to.equal('My First Blog Post');
                });

                it("Reads only posts in the database", function() {
                    var posts = db.getAllPosts(false);
                    expect(posts).to.be.an('array');
                    expect(posts).to.have.lengthOf(2);
                });

                it("Reads posts and menuPosts in the database", function() {
                    var posts = db.getAllPosts(true);
                    expect(posts).to.be.an('array');
                    expect(posts).to.have.lengthOf(3);
                });
            },

            describe("User Management", function() {

                it("Validates a succesfull user login", function() {
                    var user = db.getUser(config.blog.login,config.blog.password);
                    expect(user).to.be.an('array');
                    expect(user[0].userFullName).to.equal(config.blog.ownerName);
                });

                it("Validates an usuccesfull user login", function() {
                    var user = db.getUser(config.blog.login + 'failure',config.blog.password + 'failure');
                    expect(user).to.be.an('array');
                    expect(user).to.have.lengthOf(0);
                });

            }));

    });
});
