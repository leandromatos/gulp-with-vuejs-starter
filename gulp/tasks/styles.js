var gulp = require('gulp');
var sass = require('gulp-sass');
var scssLint = require('gulp-scss-lint');
var scssLintStylish = require('gulp-scss-lint-stylish');
var scssLint = require('gulp-scss-lint');
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cleanCss = require('gulp-clean-css');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var gulpIf = require('gulp-if');

module.exports = function(config, args, log, error, success) {
    gulp.task('styles:lint', function() {
        return gulp.src(config.styles.lint.src)
            .pipe(plumber({
                errorHandler: error
            }))
            .pipe(log({
                header: 'Styles lint:'
            }))
            .pipe(scssLint({
                customReport: scssLintStylish
            }))
            .pipe(scssLint.failReporter())
            .pipe(plumber.stop());
    });

    gulp.task('styles:build', function() {
        return gulp.src(config.styles.build.src)
            .pipe(plumber({
                errorHandler: error
            }))
            .pipe(log({
                header: 'Styles build:'
            }))
            .pipe(sass({
                noCache: true
            }).on('error', error))
            .pipe(postCss([autoprefixer({
                browsers: ['last 2 version']
            })]))
            .pipe(gulpIf(args.production === true, cleanCss({
                keepSpecialComments: 0
            })))
            .pipe(gulp.dest(config.styles.build.dest))
            .pipe(plumber.stop());
    });

    gulp.task('styles', function(callback) {
        runSequence('styles:lint', 'styles:build', callback);
    });
};
