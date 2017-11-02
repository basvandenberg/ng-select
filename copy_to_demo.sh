#!/bin/bash
rm -v src/app/ng-select/dist/ng-select-*.tgz
rm -rv demo/node_modules/ng-select/*

npm pack src/app/ng-select/dist
tar -xzvf ng-select-*.tgz
mv -v package/* demo/node_modules/ng-select/

rm ng-select-*.tgz
rmdir -v package
