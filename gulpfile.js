"use strict";

var del = require('del');
var exec = require('child_process').exec;
var gulp = require('gulp');
var tslint = require('gulp-tslint');

// Build.

gulp.task('build', ['transpile:ts']);

gulp.task('watch', function() {

    gulp.watch([
        './index.ts',
        './src/*.ts',
        '!*/**/*.d.ts',
        '!*/**/*.ngfactory.ts',
    ], [
        'build'
    ]);
});

// Typescript --> Javascript.

gulp.task('clean:js', function() {

    return del([
        './index.d.ts',
        './index.js.map',
        './index.js',
        './index.metadata.json',
        './index.ngfactory.ts',
        './src/**/*.d.ts',
        './src/**/*.js.map',
        './src/**/*.js',
        './src/**/*.metadata.json',
        './src/**/*.ngfactory.ts',
    ]);
});

gulp.task('lint:ts', function() {
    return gulp.src([
        './index.ts',
        './src/*.ts',
        '!*/**/*.d.ts',
        '!*/**/*.ngfactory.ts'
    ])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
});

gulp.task('transpile:ts', ['clean:js', 'lint:ts'], function (cb) {
  exec('./node_modules/.bin/ngc', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
