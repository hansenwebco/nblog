var loki = require('lokijs');
var moment = require('moment');
var config = require('../config');

module.exports = function(dbname) {

    console.log("Creating database " + dbname);

    var db = new loki(dbname);

    var posts = db.addCollection('posts');
    posts.insert({
        postTitle: 'My First Blog Post',
        postText: '<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.</p><p>It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p><p>The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then</p>',
        postDate: moment.utc().format(),
        postAuthor: config.blog.ownerName,
        postTags: ['first', 'new', 'hello'],
        menuItem: 0
    });

    posts.insert({
        postTitle: 'My Second Blog Post',
        postText: 'Maecenas consequat dapibus sollicitudin. Maecenas viverra risus sed elit posuere ornare. Curabitur non consectetur elit. Cras lacinia tincidunt rutrum. Ut nec magna facilisis, accumsan lorem sit amet, malesuada libero. Donec eleifend vulputate ante, in cursus lectus vulputate vitae. Ut bibendum elit eget diam convallis, ac aliquet dolor volutpat. Donec porttitor nisl leo, id commodo nulla hendrerit a. Phasellus sollicitudin nunc id congue sodales. Praesent eu sapien aliquet, semper est quis, sollicitudin odio. Sed ac sagittis sapien. Nunc vehicula feugiat nibh non lacinia. Morbi eget egestas dui, vitae iaculis magna. Maecenas dui dolor, lobortis et ex eget, euismod pellentesque erat.<br/><br/>Pellentesque accumsan consectetur est molestie convallis. In in massa vel elit maximus ultrices. Vestibulum at egestas ipsum. Curabitur congue augue sodales ligula malesuada rutrum. Nunc lobortis ex sit amet quam ultricies, eget tempor nisl malesuada. Sed pharetra mi non nisl commodo, sit amet feugiat massa consectetur. Duis porttitor est nibh, nec laoreet orci accumsan id. Nulla massa nisl, rutrum et dignissim fringilla, tempor eu est.<br/><br/>In faucibus convallis odio placerat molestie. Donec ornare arcu nulla, sit amet facilisis sapien efficitur a. Ut quis varius nisi. Mauris varius ornare velit efficitur malesuada. Etiam ac fermentum massa. In hac habitasse platea dictumst. Ut elit purus, pellentesque et mi sed, placerat pulvinar dui. Sed id odio magna. Donec tellus lacus, efficitur et sagittis eleifend, aliquet vel neque. Aliquam id vestibulum ex. Nullam sit amet ipsum ut libero accumsan commodo.',
        postDate: moment.utc().format(),
        postAuthor: config.blog.ownerName,
        postTags: ['stars', 'suns', 'planets'],
        menuItem: 0
    });
    console.log('Default posts created succesfully.');

    var users = db.addCollection('users');
    users.insert({
        userFullName: config.blog.ownerName,
        userLogin: config.blog.login,
        userPassword: config.blog.password
    });
    console.log('Default users created succesfully.');

    console.log("Setup is complete! You should delete this file in the future.");

    db.saveDatabase();
};
