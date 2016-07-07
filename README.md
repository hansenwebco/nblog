## What is This
Just a simple blog I'm creating to learn a bit more about NodeJS.  The system uses and in memory database LokiJS for ease of setup and deployment.  

## Libraries Used

 - ejs - templating library
 - ejs-mate - templating library for layouts etc
 - express - web server
 - lokijs - in memory database
 - moment - time formatting
 - siege - basic load testing  (node benchmark.js to try it out)
 - bootstrap - css layout
 - compression - gzip
 - chai - unit testing
 - mocha - test runner, use 'gulp' to execute tests
 - gulp - automated tasks, used with mocha for unit tests.

## Installation

 - clone repo
 - run 'npm install'
 - adjust settings in config.js
 - run 'node setup' (this will setup the db)
 - run 'node app'
 - navigate to http://localhost:{configport}

## Unit tests

Unit tests are run via command line using the 'gulp' command which will create a separate database file to test against.
