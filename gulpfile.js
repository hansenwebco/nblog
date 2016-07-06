var gulp = require('gulp');
var mocha  = require('gulp-mocha');
var clean = require('gulp-clean');
var setup = require('./scripts/setupdb');
var runSequence = require('run-sequence');

gulp.task('createdb', function() {
   setup('testdb.json');
});

gulp.task('test', function() {
  return gulp
    .src('test/*.js')
    .pipe(mocha());
});

gulp.task('cleanup', function()
{
    console.log('Removing test database');
    return gulp.src("testdb.json", { read: false }).pipe(clean());
});

gulp.task('default', function(callback) {
  runSequence('createdb','test','cleanup',callback);
});
