var fs = require('fs-extra');
var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var path = require('path');
var package = require('./package.json');

gulp.task('bower-install-dev', function () {
    // npm install
    return gulp.src('./ui/bower.json', {base:'./ui'})
    .pipe(gulp.dest('./ui'))
    .pipe(install({production: false}));
});

gulp.task('watch', function () {
    gulp.start(['watch-less', 'watch-electron']);
});

gulp.task('watch-less', function() {
    gulp.start(['less']);
    gulp.watch('./src/public/styles/*.less', ['less']);  // Watch all the .less files, then run the less task
});

gulp.task('less', function () {
    return gulp.src('./src/public/styles/style.less')
    .pipe(less())
    .pipe(gulp.dest('./src/public/styles/'));
});
