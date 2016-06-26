var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserify = require('browserify');
var vueify = require('vueify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var gulpIf = require('gulp-if');
var esformatter = require('gulp-esformatter');

module.exports = function(config, args, log, error, success) {
    gulp.task('scripts:formatter', function() {
        return gulp.src(config.scripts.formatter.src)
            .pipe(plumber({
                errorHandler: error
            }))
            .pipe(log({
                header: 'Formatter scripts:'
            }))
            .pipe(esformatter())
            .pipe(gulp.dest(config.scripts.formatter.dest))
            .pipe(plumber.stop());
    });

    gulp.task('scripts:lint', function() {
        return gulp.src(config.scripts.lint.src)
            .pipe(plumber({
                errorHandler: error
            }))
            .pipe(log({
                header: 'Scripts lint:'
            }))
            .pipe(jshint())
            .pipe(jshint.reporter(jshintStylish))
            .pipe(jshint.reporter('fail'))
            .pipe(plumber.stop());
    });

    gulp.task('scripts:vueify', function() {
        return browserify(config.scripts.vueify.src)
            .transform(babelify)
            .transform(vueify)
            .bundle()
            .on('error', error)
            .pipe(source(config.scripts.vueify.dest))
            .pipe(plumber({
                errorHandler: error
            }))
            .pipe(log({
                header: 'Components transform with browserify + vueify...'
            }))
            .pipe(gulp.dest(''))
            .pipe(plumber.stop());
    });

    gulp.task('scripts:build', function() {
        return gulp.src(config.scripts.build.src)
            .pipe(plumber({
                errorHandler: error
            }))
            .pipe(log({
                header: 'Scripts build:'
            }))
            .pipe(concat(config.scripts.build.dest))
            .pipe(gulpIf(args.production === true, uglify()))
            .pipe(gulp.dest(''))
            .pipe(plumber.stop());
    });

    gulp.task('scripts', function(callback) {
        return runSequence('scripts:formatter', 'scripts:lint', 'scripts:vueify', 'scripts:build', callback);
    });
};
