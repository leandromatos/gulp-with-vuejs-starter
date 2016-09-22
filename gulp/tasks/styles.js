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
var concat = require('gulp-concat');

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

    gulp.task('styles:process', function() {
        return gulp.src(config.styles.process.src)
            .pipe(plumber({
                errorHandler: error
            }))
            .pipe(log({
                header: 'Styles process:'
            }))
            .pipe(sass({
                noCache: true
            }).on('error', error))
            .pipe(postCss([autoprefixer({
                browsers: ['last 2 version']
            })]))
            .pipe(gulp.dest(config.styles.process.dest))
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
            .pipe(concat('app.css'))
            .pipe(gulpIf(args.production === true, cleanCss({
                keepSpecialComments: 0
            })))
            .pipe(gulp.dest(config.styles.build.dest))
            .pipe(plumber.stop());
    });

    gulp.task('styles', function(callback) {
        runSequence('styles:lint', 'styles:process', 'styles:build', callback);
    });
};
