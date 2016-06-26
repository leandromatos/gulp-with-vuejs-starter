var gulp = require('gulp');
var plumber = require('gulp-plumber');
var log = require('../log/log.js');
var notifyError = require('../notify/error.js');

module.exports = function(config, args, log, error, success) {

    gulp.task('fonts', function() {
        return gulp.src(config.fonts.src)
            .pipe(plumber({
                errorHandler: notifyError
            }))
            .pipe(log({
                header: 'Copy fonts:'
            }))
            .pipe(gulp.dest(config.fonts.dest))
            .pipe(plumber.stop());
    });

};
