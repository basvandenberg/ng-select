"use strict";

var del = require('del');
var exec = require('child_process').exec;
var fs = require('fs');
var gulp = require('gulp');
var os = require('os');
var sass = require('gulp-sass');
var tslint = require('gulp-tslint');

// Build.

gulp.task('build', ['transpile:ts'], function() {
    return del([
        './src/select.component.html.ts',
        './src/select.component.css',
        './src/select.component.css.ts',
        './src/select-dropdown.component.html.ts',
        './src/select-dropdown.component.css',
        './src/select-dropdown.component.css.ts'
    ]);
});

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

    // TODO delete dist directory...
    return del([
        './index.d.ts',
        './index.js',
        './index.metadata.json',
        './index.ngfactory.ts',
        './index.ngsummary.json',
        './src/**/*.d.ts',
        './src/**/*.css.ts',
        './src/**/*.scss.ts',
        './src/**/*.js',
        './src/**/*.metadata.json',
        './src/**/*.ngfactory.ts',
        './src/**/*.ngstyle.ts',
        './src/**/*.ngsummary.json',
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
        '!*/**/*.ngfactory.ts',
        '!*/**/*.ngstyle.ts'
    ])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
});

gulp.task('transpile:ts', ['clean', 'templates', 'styles'], function (cb) {

    var cmd = os.platform() === 'win32' ?
        'node_modules\\.bin\\ngc' : './node_modules/.bin/ngc';

    exec(cmd, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// HTML template --> Typescript.

gulp.task('templates', ['lint:ts'], function() {

    var t1 = fs.readFileSync('./src/select.component.html', 'utf8');
    var t2 = fs.readFileSync('./src/select-dropdown.component.html', 'utf8');

    t1 = 'export const TEMPLATE = `' + t1 + '`;';
    t2 = 'export const TEMPLATE = `' + t2 + '`;';

    fs.writeFileSync('./src/select.component.html.ts', t1);
    fs.writeFileSync('./src/select-dropdown.component.html.ts', t2);

    return;
});

// Sass --> CSS -> Typescript.

gulp.task('styles', ['transpile:sass'], function() {

    var s1 = fs.readFileSync('./src/select.component.css', 'utf8');
    var s2 = fs.readFileSync('./src/select-dropdown.component.css', 'utf8');

    s1 = 'export const STYLE = `' + s1 + '`;';
    s2 = 'export const STYLE = `' + s2 + '`;';

    fs.writeFileSync('./src/select.component.css.ts', s1);
    fs.writeFileSync('./src/select-dropdown.component.css.ts', s2);

    return;
});


gulp.task('transpile:sass', function() {
    return gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/'))
});
