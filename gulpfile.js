"use strict";

var del = require('del');
var exec = require('child_process').exec;
var gulp = require('gulp');
var os = require('os');
var tslint = require('gulp-tslint');

// Build.

gulp.task('build', ['transpile:ts']);

gulp.task('watch', function() {

    gulp.watch([
        './index.ts',
        './src/*.ts',
        './src/*.html',
        './src/*.scss',
        '!*/**/*.d.ts',
        '!*/**/*.scss.ts',
        '!*/**/*.ngfactory.ts'
    ], [
        'build'
    ]);
});

gulp.task('clean', function() {

    return del([
        './index.d.ts',
        './index.js',
        './index.metadata.json',
        './index.ngfactory.ts',
        './src/**/*.d.ts',
        './src/**/*.css.ts',
        './src/**/*.scss.ts',
        './src/**/*.js',
        './src/**/*.metadata.json',
        './src/**/*.ngfactory.ts',
    ]);
});

// Typescript --> Javascript.

gulp.task('lint:ts', function() {
    return gulp.src([
        './index.ts',
        './src/*.ts',
        '!*/**/*.d.ts',
        '!*/**/*.css.ts',
        '!*/**/*.scss.ts',
        '!*/**/*.ngfactory.ts'
    ])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
});

gulp.task('transpile:ts', ['clean', 'lint:ts'], function (cb) {

    var cmd = os.platform() === 'win32' ?
        'node_modules\\.bin\\ngc' : './node_modules/.bin/ngc';

    exec(cmd, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});
