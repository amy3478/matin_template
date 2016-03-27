var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var minifycss = require('gulp-minify-css');
var notify = require("gulp-notify");
var rename = require('gulp-rename');


var config = {
  sassPath: ['./scss'],
  comSassPath: ['./html']
};

gulp.task('styles', function() {
  return sass(config.sassPath + '/index.scss', {
    precision: 6,
    stopOnError: true,
    cacheLocation:'./cache'
    })
    .on("error", notify.onError(function (error) {
      return "Error: " + error.message;
    }))
    .pipe(gulp.dest('./css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./css'));
});

gulp.task('com_styles', function() {
  return sass(config.comSassPath + '/**/*.scss', {
    precision: 6,
    stopOnError: true,
    cacheLocation:'./cache'
    })
    .on("error", notify.onError(function (error) {
      return "Error: " + error.message;
    }));
});


// Rerun the task when a file changes

gulp.task('watch', function() {
  gulp.watch(config.sassPath + '/*.scss', ['styles']);
});

gulp.task('default', ['styles', 'watch']);
