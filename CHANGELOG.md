# Changelog

<a name="1.0.0-alpha.12"></a>
## [1.0.0-alpha.12](https://github.com/basvandenberg/angular2-select/compare/1.0.0-alpha.11...1.0.0-alpha.12) ()

### Breaking changes

- The method `clearSelected` is changed to `clear`.

### Bug fixes

- Trigger `deselected` event on clear single select click (#23).
- Typo fixes.

<a name="1.0.0-alpha.11"></a>
## [1.0.0-alpha.11](https://github.com/basvandenberg/angular2-select/compare/1.0.0-alpha.10...1.0.0-alpha.11) ()

- Update to Angular 2.1.0.



<a name="1.0.0-alpha.10"></a>
## [1.0.0-alpha.10](https://github.com/basvandenberg/angular2-select/compare/1.0.0-alpha.9...1.0.0-alpha.10) ()

### Bug fixes

- Fix errors in package.json and tsconfig.json ([#18] (https://github.com/basvandenberg/angular2-select/issues/18)).
- Fix empty value multi-select, so that required validator works ([#21] (https://github.com/basvandenberg/angular2-select/issues/21)).
- Fix setting value of single select ([#19] (https://github.com/basvandenberg/angular2-select/issues/19)).

### Improvements

- Set ViewEncapsulation to None to enable style override ([#16] (https://github.com/basvandenberg/angular2-select/issues/16)). 



<a name="1.0.0-alpha.9"></a>
## [1.0.0-alpha.9](https://github.com/basvandenberg/angular2-select/compare/1.0.0-alpha.8...1.0.0-alpha.9) (2016-10-05)

### Bug fixes

- Fix gulp watch task.
- Fix gulp build taks.
- Fix tsconfig, and added types to compilerOptions.
- Fix AoT build, made some variables public.



<a name="1.0.0-alpha.8"></a>
## [1.0.0-alpha.8](https://github.com/basvandenberg/angular2-select/compare/1.0.0-alpha.7...1.0.0-alpha.8) (2016-10-01)

### Features

- Added ngc/AoT support ([#11] (https://github.com/basvandenberg/angular2-select/pull/11)).

### Bug fixes

- Fix clear selection using form control's setValue function ([#5] (https://github.com/basvandenberg/angular2-select/issues/5)).
- Update current selection when option list is changed ([#6] (https://github.com/basvandenberg/angular2-select/issues/6)).
- Prevent javascript error when list of options is empty ([#7] (https://github.com/basvandenberg/angular2-select/issues/7)).
- Prevent javascript error when clicking the 'No results found' option ([#8] (https://github.com/basvandenberg/angular2-select/issues/8)).

