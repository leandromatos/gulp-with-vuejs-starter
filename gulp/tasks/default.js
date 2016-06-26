var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);

module.exports = function(config, args, log, error, success) {
    gulp.task('default', function(callback) {
        runSequence('cleaning', 'fonts', 'images', 'scripts', 'styles', success);
        callback;
    });
};
