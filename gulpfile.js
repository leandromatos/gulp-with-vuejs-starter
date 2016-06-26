var gulp = require('gulp');
var glob = require('glob');
var minimist = require('minimist');
var runSequence = require('run-sequence').use(gulp);
var config = require('./gulp/config');
var log = require('./gulp/log/log');
var error = require('./gulp/notify/error');
var success = require('./gulp/notify/success');

var args = minimist(process.argv.slice(2), {
    string: 'env',
    default: {
        env: process.env.NODE_ENV || 'production'
    }
});

glob.sync('./gulp/tasks/*.js', {
    realpath: true
}).forEach(function(file) {
    require(file)(config, args, log, error, success);
});
