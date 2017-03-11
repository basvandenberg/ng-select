#!/bin/bash
rm -v ng-select-*.tgz
rm -rv demo/node_modules/ng-select/*

npm pack
tar -xzvf ng-select-*.tgz
mv -v package/* demo/node_modules/ng-select/

rm ng-select-*.tgz
rmdir -v package
