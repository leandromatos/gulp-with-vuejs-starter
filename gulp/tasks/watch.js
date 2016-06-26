var gulp = require('gulp');

module.exports = function(config, args, log, error, success) {

    gulp.task('watch', function() {
        gulp.watch('./resources/assets/scripts/**/*.{js,vue}', ['scripts']);
        gulp.watch('./resources/assets/styles/**/*.scss', ['styles']);
    });

};
