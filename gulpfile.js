"use strict";

var del = require('del');
var gulp = require('gulp');
var merge = require('merge2');
var tslint = require('gulp-tslint');
var typescript = require('gulp-typescript');

// Build.

gulp.task('build', ['transpile:ts']);

gulp.task('watch', function() {

    gulp.watch([
        './select.ts',
        './src/*.ts',
        '!*/**/*.d.ts'
    ], [
        'build'
    ]);
});

// Typescript --> Javascript.

gulp.task('clean:js', function() {

    return del([
        './select.d.ts',
        './select.js',
        './select.js.map',
        './src/**/*.d.ts',
        './src/**/*.js',
        './src/**/*.js.map'
    ]);
});

gulp.task('lint:ts', function() {
    return gulp.src([
        './select.ts', 
        './src/*.ts', 
        '!*/**/*.d.ts'
    ])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
});

gulp.task('transpile:ts', ['clean:js', 'lint:ts'], function () {

    var compilerOptions = {
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        declaration: true,
        module: 'commonjs',
        moduleResolution: 'node',
        noImplicitAny: false,
        removeComments: false,
        sourceMap: false,
        target: 'es5'
    };

    var tsResult = gulp.src([
        './select.ts', 
        './src/*.ts',
        './node_modules/@types/core-js/index.d.ts',
        './node_modules/@types/jasmine/index.d.ts',
        './node_modules/@types/node/index.d.ts'
    ], {
        base: './'
    })
        .pipe(typescript(compilerOptions));

    return merge([
        tsResult.js
            .pipe(gulp.dest('.')),
        tsResult.dts
            .pipe(gulp.dest('.'))
    ]);
});
