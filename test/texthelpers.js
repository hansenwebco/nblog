var assert = require('chai').assert;
var expect    = require("chai").expect;
var texthelpers = require('../src/texthelpers');

describe("Text Helper", function() {
    it("Converts a string to SEO Format", function() {
       var simpleString = texthelpers.seoifyURL('this is a simple string');
       var complexString = texthelpers.seoifyURL('!@c#$l%^&e*()a-_=+n[]{e}|?d/.,');
       var nostring = texthelpers.seoifyURL('');

       expect(simpleString).to.equal('this-is-a-simple-string');
       expect(complexString).to.equal('c-l-e-a-n-e-d');
       expect(nostring).to.equal('');
    });

    it("Shortens strings over X Characters and Adds ...", function() {
      var string = "This is a text string.";

      var short = texthelpers.readMore(string,23);
      var sameLength = texthelpers.readMore(string,22);
      var long = texthelpers.readMore(string,6);

      expect(short).to.equal('This is a text string.');
      expect(sameLength).to.equal('This is a text string.');
      expect(long).to.equal('This ...');
    });
});
