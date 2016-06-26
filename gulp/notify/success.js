var gulp = require('gulp');
var notify = require('gulp-notify');

module.exports = function () {
    notify({
        title: 'High five',
        message: 'Default tasks completed!',
        sound: 'Glass',
        icon: null
    }).write('./');
};