# Select component for angular
[![npm version](https://badge.fury.io/js/ng-select.svg)](https://badge.fury.io/js/ng-select)
[![Build Status](https://travis-ci.org/basvandenberg/ng-select.svg?branch=master)](https://travis-ci.org/basvandenberg/ng-select)

A select component for angular, based on the [select2] JQuery plugin. See the
[ng-select] web site for documentation and examples, or try it with this [plunker].

## Develop

Make sure that `gulp` and `yarn` are installed.

Clone the repository and run:
```bash
$ yarn install
$ gulp build
```

To install and run the ng-select web site on your local machine, run the following in the demo
folder:
```bash
$ yarn install
$ ng serve
```

For manual testing, pack and install a modified version of the ng-select component to ng-select web 
site with the script:
```bash
$ ./copy_to_demo.sh
```
[ng-select]: https://basvandenberg.github.io/ng-select
[select2]: https://select2.github.io
[plunker]: https://plnkr.co/edit/vxwV6zxEwZGVUVR5V6tg?p=preview
