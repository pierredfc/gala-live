var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var template = require('gulp-template');

gulp.task('app', function() {
  return browserify('static/reactions.js')
    .transform("babelify")
    .bundle()
    .pipe(source('build.js'))
    .pipe(gulp.dest('static/'));
});

gulp.task('html', function() {
  return gulp.src('static/index.html')
    .pipe(template({
      POST_ID: process.env.POST_ID,
      API_TOKEN: process.env.API_TOKEN
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['app', 'html']);
