# Select component for angular
[![npm version](https://badge.fury.io/js/ng-select.svg)](https://badge.fury.io/js/ng-select)
[![Build Status](https://travis-ci.org/basvandenberg/ng-select.svg?branch=master)](https://travis-ci.org/basvandenberg/ng-select)

A select component for angular, based on the [select2] JQuery plugin. See the
[ng-select] web site for documentation and examples.

## Develop

Make sure that `yarn` is installed.

After clone the repository, run the test app with:
```bash
$ yarn install
$ ng serve
```

To install and run the ng-select demo/documentation web site on your local 
machine, enter the `demo` folder and run:
```bash
$ cd demo
$ yarn install
$ ng serve
```

To build the ng-select module, run:
```bash
$ yarn run build-lib
```

Publishing to npm is done from the `dist` folder:
```bash
$ cd dist
$ npm publish
```



[ng-select]: https://basvandenberg.github.io/ng-select
[select2]: https://select2.github.io
