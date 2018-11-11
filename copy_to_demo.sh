#!/bin/bash
rm -rv node_modules/ng-select/*

npm pack dist/ng-select/
tar -xzvf ng-select-*.tgz
mv -v package/* node_modules/ng-select/

rm ng-select-*.tgz
rmdir -v package
