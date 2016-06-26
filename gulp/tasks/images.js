var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var log = require('../log/log.js');
var notifyError = require('../notify/error.js');

module.exports = function(config, args, log, error, success) {

    gulp.task('images', function() {
        return gulp.src(config.images.src)
            .pipe(plumber({
                errorHandler: notifyError
            }))
            .pipe(log({
                header: 'Copy images:'
            }))
            .pipe(gulpIf(args.production === true, imagemin()))
            .pipe(gulp.dest(config.images.dest))
            .pipe(plumber.stop());
    });

};
