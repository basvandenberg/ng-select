"use strict";

const del = require('del');
const exec = require('child_process').exec;
const fs = require('fs');
const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const os = require('os');
const sass = require('gulp-sass');
const tslint = require('gulp-tslint');

gulp.task('default', ['build']);

// Build.

gulp.task('build', ['transpile:ts'], function() {
    return del([
        './aot',
        './src/select.component.html.ts',
        './src/select.component.css',
        './src/select.component.css.ts',
        './src/select-dropdown.component.html.ts',
        './src/select-dropdown.component.css',
        './src/select-dropdown.component.css.ts'
    ]);
});

gulp.task('watch', function() {
    gulp.watch(['./src/**/*'], ['build']);
});

gulp.task('clean', function() {
    return del(['./aot', './dist/**/*']);
});

// Test.

gulp.task('test', function() {
    gulp.src('./dist/**/*.spec.js')
        .pipe(jasmine());
});

// Typescript --> Javascript.

gulp.task('lint:ts', function() {
    return gulp.src(['./src/*.ts'])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task('transpile:ts', ['clean', 'templates', 'styles'], function (cb) {

    var cmd = os.platform() === 'win32' ?
        'node_modules\\.bin\\ngc -p src/tsconfig.json' : 
        './node_modules/.bin/ngc -p src/tsconfig.json';

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
